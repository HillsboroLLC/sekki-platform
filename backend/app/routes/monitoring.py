from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.connector_monitor import check_connector_health, generate_connector_insights

monitoring_bp = Blueprint("monitoring", __name__)


@monitoring_bp.route("/health", methods=["GET"])
@jwt_required()
def connector_health():
    user_id = str(get_jwt_identity() or "").strip()
    report = check_connector_health(user_id)
    return jsonify(report), 200


@monitoring_bp.route("/insights/<connector_id>", methods=["GET"])
@jwt_required()
def connector_insights(connector_id):
    user_id = str(get_jwt_identity() or "").strip()
    thread_id = request.args.get("thread_id")
    insights = generate_connector_insights(user_id, str(connector_id or "").strip(), thread_id)
    return jsonify(insights), 200


@monitoring_bp.route("/alerts", methods=["GET"])
@jwt_required()
def active_alerts():
    user_id = str(get_jwt_identity() or "").strip()
    report = check_connector_health(user_id)
    return jsonify({
        "alerts": report["alerts"],
        "total": len(report["alerts"]),
        "checked_at": report["checked_at"],
    }), 200
