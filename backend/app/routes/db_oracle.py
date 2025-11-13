from __future__ import annotations
import os
from flask import Blueprint, jsonify

db_oracle_bp = Blueprint("db_oracle", __name__, url_prefix="/api/db/oracle")

REQUIRED_VARS = ["ORACLE_DSN", "ORACLE_USER", "ORACLE_PASSWORD"]

def _mask(v: str | None) -> str:
    if not v:
        return ""
    return v[:2] + "****" if len(v) > 6 else "****"

@db_oracle_bp.route("/health", methods=["GET"])
def health():
    present = {k: bool(os.getenv(k)) for k in REQUIRED_VARS}
    details = {
        "dsn": os.getenv("ORACLE_DSN", ""),
        "user": os.getenv("ORACLE_USER", ""),
        "password_masked": _mask(os.getenv("ORACLE_PASSWORD")),
        "wallet_dir_set": bool(os.getenv("ORACLE_WALLET_DIR")),
        "pool_min": os.getenv("ORACLE_POOL_MIN", "1"),
        "pool_max": os.getenv("ORACLE_POOL_MAX", "4"),
        "pool_inc": os.getenv("ORACLE_POOL_INC", "1"),
        "ssl_server_dn_match": os.getenv("ORACLE_SSL_SERVER_DN_MATCH", "true"),
    }
    status = "ok" if all(present.values()) else "incomplete_config"
    return jsonify({"status": status, "present": present, "details": details}), 200
