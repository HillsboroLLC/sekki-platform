"""app.routes.auth

Purpose
  Centralize authentication endpoints (signup/login/me) and Stripe Checkout
  session creation for paid plans.

Why this file exists
  Auth is a high-risk surface area. This module keeps auth behavior explicit
  and auditable, and it avoids spreading URL/config assumptions throughout
  the codebase.
"""

from __future__ import annotations

import os

from flask import Blueprint, request, jsonify, current_app, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, decode_token

from authlib.integrations.flask_client import OAuth

from app import db
from app.models import User
import stripe

auth_bp = Blueprint("auth", __name__)


# ---------------------------------------------------------------------------
# Config helpers
# ---------------------------------------------------------------------------
def _get_frontend_base_url() -> str:
    """Return the frontend base URL for redirects.

    Precedence:
      1) Flask config FRONTEND_BASE_URL
      2) Flask config FRONTEND_URL (back-compat)
      3) Environment variables FRONTEND_BASE_URL then FRONTEND_URL

    Normalization:
      - Trailing slashes are removed so URL joining is predictable.
    """
    value = (
        current_app.config.get("FRONTEND_BASE_URL")
        or current_app.config.get("FRONTEND_URL")
        or os.getenv("FRONTEND_BASE_URL")
        or os.getenv("FRONTEND_URL")
    )
    if not value:
        raise RuntimeError(
            "Missing FRONTEND_BASE_URL/FRONTEND_URL configuration for redirects"
        )
    return str(value).rstrip("/")


def _get_google_client():
    """Return a cached Authlib Google OAuth client."""
    client = current_app.extensions.get("jaspen_google_oauth_client")
    if client is not None:
        return client

    client_id = current_app.config.get("GOOGLE_CLIENT_ID") or os.getenv("GOOGLE_CLIENT_ID")
    client_secret = current_app.config.get("GOOGLE_CLIENT_SECRET") or os.getenv("GOOGLE_CLIENT_SECRET")

    if not client_id or not client_secret:
        raise RuntimeError("Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET")

    # Cache OAuth instance on the app so we don't re-register on every request
    oauth = current_app.extensions.get("jaspen_oauth")
    if oauth is None:
        oauth = OAuth(current_app)
        current_app.extensions["jaspen_oauth"] = oauth

    # Register once; if it's already registered, Authlib will just overwrite safely.
    oauth.register(
        name="google",
        client_id=client_id,
        client_secret=client_secret,
        server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
        client_kwargs={"scope": "openid email profile"},
    )

    client = oauth.create_client("google")
    current_app.extensions["jaspen_google_oauth_client"] = client
    return client


@auth_bp.before_app_request
def _set_stripe_key():
    stripe.api_key = current_app.config["STRIPE_SECRET_KEY"]


# ---------------------------------------------------------------------------
# Routes: signup
# ---------------------------------------------------------------------------
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    plan_key = data.get("plan_key", "essential")
    extra_seats = int(data.get("extra_seats", 0))

    # Basic validation
    if not name or not email or not password:
        return jsonify(message="Name, email and password are all required"), 400
    if User.query.filter_by(email=email).first():
        return jsonify(message="Email already registered"), 409

    # Create local user record
    user = User(
        name=name,
        email=email,
        password_hash=generate_password_hash(password),
        subscription_plan=plan_key,
        seat_limit=1 + extra_seats,
        max_seats=1 + extra_seats,
    )
    db.session.add(user)
    db.session.commit()

    # Issue JWT
    access_token = create_access_token(identity=str(user.id))

    # If free plan, just return token/user
    if plan_key == "essential":
        return (
            jsonify(
                message="User created",
                token=access_token,
                user={"id": user.id, "email": user.email, "name": user.name},
            ),
            201,
        )

    # Otherwise, create Stripe Checkout Session for the chosen plan
    price_ids = current_app.config.get("STRIPE_PRICE_IDS", {})
    price_id = price_ids.get(plan_key)
    if not price_id:
        return jsonify(message=f"Unknown or unconfigured plan_key '{plan_key}'"), 400

    frontend = _get_frontend_base_url()

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="subscription",
        line_items=[{"price": price_id, "quantity": 1}],
        metadata={"user_id": str(user.id), "plan_key": plan_key},
        success_url=f"{frontend}/pricing?session_id={{CHECKOUT_SESSION_ID}}&status=success",
        cancel_url=f"{frontend}/pricing?status=cancel",
    )

    return (
        jsonify(
            message="User created; complete payment",
            token=access_token,
            checkout_session_id=session.id,
            user={"id": user.id, "email": user.email, "name": user.name},
        ),
        201,
    )


# ---------------------------------------------------------------------------
# Routes: login (email+password legacy)
# ---------------------------------------------------------------------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify(message="Email and password required"), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify(message="Invalid credentials"), 401

    token = create_access_token(identity=str(user.id))
    resp = jsonify(token=token, user={"id": user.id, "email": user.email, "name": user.name})

    # Keep existing behavior (JS-readable) but correct domain for Jaspen
    resp.set_cookie(
        "sekki_access",
        token,
        httponly=False,
        secure=True,
        samesite="None",
        path="/",
        domain=".jaspen.ai",
        max_age=28800,
    )
    return resp, 200


# ---------------------------------------------------------------------------
# Routes: current user
# ---------------------------------------------------------------------------
@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify(error="User not found"), 404
    return jsonify(id=user.id, email=user.email, name=user.name), 200


@auth_bp.route('/me-cookie', methods=['GET'])
def get_current_user_from_cookie():
    token = request.cookies.get('sekki_access')
    if not token:
        return jsonify(error="Missing auth cookie"), 401

    try:
        decoded = decode_token(token)
        user_id = decoded.get("sub")
        if not user_id:
            return jsonify(error="Invalid token"), 401
    except Exception:
        return jsonify(error="Invalid token"), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify(error="User not found"), 404

    return jsonify(id=user.id, email=user.email, name=user.name), 200


# ---------------------------------------------------------------------------
# Routes: Google OAuth (Jaspen-owned)
# ---------------------------------------------------------------------------
@auth_bp.route("/google/start", methods=["GET"])
def google_start():
    google = _get_google_client()
    # Must match Google Console redirect URI (and your Nginx/base domain)
    redirect_uri = "https://api.jaspen.ai/api/auth/google/callback"
    return google.authorize_redirect(redirect_uri)


@auth_bp.route("/google/callback", methods=["GET"])
def google_callback():
    google = _get_google_client()
    token = google.authorize_access_token()

    # With OIDC server metadata, userinfo is commonly available here
    userinfo = token.get("userinfo") or {}
    email = (userinfo.get("email") or "").strip().lower()
    name = (userinfo.get("name") or "").strip() or email

    if not email:
        return jsonify(ok=False, error="No email returned from Google"), 400

    # Find or create local user
    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(
            name=name,
            email=email,
            password_hash=generate_password_hash(os.urandom(16).hex()),  # random; user uses Google
            subscription_plan="essential",
            seat_limit=1,
            max_seats=1,
        )
        db.session.add(user)
        db.session.commit()

    jwt_token = create_access_token(identity=str(user.id))

    frontend = _get_frontend_base_url()
    resp = redirect(f"{frontend}/market-iq")

    # Cookie is what will let jaspen.ai see the session
    resp.set_cookie(
        "sekki_access",
        jwt_token,
        httponly=True,   # more secure for OAuth flow
        secure=True,
        samesite="None",
        path="/",
        domain=".jaspen.ai",
        max_age=28800,
    )
    return resp
