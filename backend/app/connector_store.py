import base64
import hashlib
import json
import os
import secrets
from copy import deepcopy
from datetime import datetime, timedelta

try:
    from cryptography.fernet import Fernet, InvalidToken
except Exception:  # pragma: no cover - optional import guard for constrained envs
    Fernet = None
    InvalidToken = Exception


CONNECTORS_DIR = "connectors_data"
SYNC_MODES = ("import", "push", "two_way")
CONFLICT_POLICIES = ("latest_wins", "prefer_external", "prefer_jaspen", "manual_review")
AUDIT_LOG_LIMIT = 500
DEFAULT_AUDIT_LIMIT = 100
MAX_AUDIT_LIMIT = 500
_SECRET_PREFIX = "enc::"

# Per-connector credential fields that must never be stored in plain text.
SENSITIVE_CONNECTOR_FIELDS = {
    "jira_sync": ("jira_api_token",),
    "workfront_sync": ("workfront_api_token",),
    "smartsheet_sync": ("smartsheet_api_token",),
    "salesforce_insights": ("salesforce_client_secret", "salesforce_refresh_token", "salesforce_access_token"),
    "snowflake_insights": ("snowflake_password", "snowflake_private_key"),
}


def _iso_now():
    return datetime.utcnow().isoformat()


def _parse_int(value, default=0):
    try:
        return int(value)
    except Exception:
        return default


def _ensure_connectors_dir():
    if not os.path.exists(CONNECTORS_DIR):
        os.makedirs(CONNECTORS_DIR)


def _connector_file(user_id):
    _ensure_connectors_dir()
    return os.path.join(CONNECTORS_DIR, f"user_{user_id}_connectors.json")


def _default_state():
    return {
        "connectors": {},
        "thread_sync": {},
        "audit_log": [],
    }


def _default_connector_settings(connector_id):
    return {
        "connector_id": connector_id,
        "connection_status": "disconnected",
        "sync_mode": "import",
        "conflict_policy": "prefer_external",
        "auto_sync": True,
        "external_workspace": "",

        # Common runtime and reliability metadata
        "last_sync_at": None,
        "last_sync_result": "never",
        "health_status": "unknown",
        "consecutive_failures": 0,
        "next_retry_at": None,
        "last_success_at": None,
        "last_error_at": None,
        "last_error_message": "",
        "updated_at": None,

        # Jira
        "jira_base_url": "",
        "jira_project_key": "",
        "jira_email": "",
        "jira_api_token": "",
        "jira_issue_type": "",
        "jira_field_mapping": {},

        # Workfront
        "workfront_base_url": "",
        "workfront_project_id": "",
        "workfront_api_token": "",
        "workfront_field_mapping": {},

        # Smartsheet
        "smartsheet_base_url": "",
        "smartsheet_sheet_id": "",
        "smartsheet_api_token": "",
        "smartsheet_field_mapping": {},

        # Salesforce (enterprise data)
        "salesforce_auth_base_url": "",
        "salesforce_instance_url": "",
        "salesforce_client_id": "",
        "salesforce_client_secret": "",
        "salesforce_refresh_token": "",
        "salesforce_access_token": "",
        "salesforce_token_type": "",
        "salesforce_token_expires_at": None,

        # Snowflake (enterprise data)
        "snowflake_account": "",
        "snowflake_warehouse": "",
        "snowflake_database": "",
        "snowflake_schema": "",
        "snowflake_role": "",
        "snowflake_user": "",
        "snowflake_password": "",
        "snowflake_private_key": "",
        "snowflake_table_allowlist": [],
    }


def _default_thread_sync_profile(thread_id):
    return {
        "thread_id": thread_id,
        "connector_ids": [],
        "sync_mode": "import",
        "conflict_policy": "prefer_external",
        "field_mapping": {
            "summary": "title",
            "status": "status",
            "owner": "owner",
            "due_date": "due_date",
        },
        "mirror_external_to_wbs": True,
        "mirror_wbs_to_external": False,
        "auto_reconcile": True,
        "updated_at": None,
    }


def _sensitive_fields_for(connector_id):
    key = str(connector_id or "").strip().lower()
    return set(SENSITIVE_CONNECTOR_FIELDS.get(key, ()))


def _build_cipher():
    if Fernet is None:
        return None
    secret_material = (
        os.getenv("CONNECTOR_CREDENTIALS_SECRET")
        or os.getenv("JWT_SECRET_KEY")
        or os.getenv("SECRET_KEY")
        or ""
    ).strip()
    if not secret_material:
        return None
    digest = hashlib.sha256(secret_material.encode("utf-8")).digest()
    key = base64.urlsafe_b64encode(digest)
    try:
        return Fernet(key)
    except Exception:
        return None


def _encrypt_secret(value):
    text = str(value or "")
    if not text:
        return ""
    if text.startswith(_SECRET_PREFIX):
        return text
    cipher = _build_cipher()
    if not cipher:
        # Fallback is plain text if no secret key is configured. This avoids breaking
        # runtime behavior while still allowing secure-at-rest in configured envs.
        return text
    token = cipher.encrypt(text.encode("utf-8")).decode("utf-8")
    return f"{_SECRET_PREFIX}{token}"


def _decrypt_secret(value):
    text = str(value or "")
    if not text:
        return ""
    if not text.startswith(_SECRET_PREFIX):
        return text
    cipher = _build_cipher()
    if not cipher:
        return ""
    token = text[len(_SECRET_PREFIX):]
    try:
        return cipher.decrypt(token.encode("utf-8")).decode("utf-8")
    except (InvalidToken, ValueError):
        return ""


def _hydrate_connector_settings(connector_id, current):
    base = _default_connector_settings(connector_id)
    if isinstance(current, dict):
        base.update(current)
    for secret_field in _sensitive_fields_for(connector_id):
        if secret_field in base:
            base[secret_field] = _decrypt_secret(base.get(secret_field))
    return base


def _persist_connector_settings(connector_id, current):
    prepared = dict(current or {})
    for secret_field in _sensitive_fields_for(connector_id):
        if secret_field in prepared:
            prepared[secret_field] = _encrypt_secret(prepared.get(secret_field))
    return prepared


def load_connector_state(user_id):
    path = _connector_file(user_id)
    if os.path.exists(path):
        try:
            with open(path, "r") as f:
                data = json.load(f)
                if isinstance(data, dict):
                    data.setdefault("connectors", {})
                    data.setdefault("thread_sync", {})
                    data.setdefault("audit_log", [])
                    if not isinstance(data["connectors"], dict):
                        data["connectors"] = {}
                    if not isinstance(data["thread_sync"], dict):
                        data["thread_sync"] = {}
                    if not isinstance(data["audit_log"], list):
                        data["audit_log"] = []
                    return data
        except Exception as e:
            print(f"[connectors] load error for {user_id}: {e}")
    return _default_state()


def save_connector_state(user_id, data):
    path = _connector_file(user_id)
    payload = data if isinstance(data, dict) else _default_state()
    try:
        with open(path, "w") as f:
            json.dump(payload, f, indent=2)
        return True
    except Exception as e:
        print(f"[connectors] save error for {user_id}: {e}")
        return False


def get_connector_settings(user_id, connector_id):
    state = load_connector_state(user_id)
    connectors = state.get("connectors") or {}
    key = str(connector_id or "").strip().lower()
    current = connectors.get(key)
    return _hydrate_connector_settings(key, current)


def get_all_connector_settings(user_id):
    state = load_connector_state(user_id)
    raw = state.get("connectors") or {}
    result = {}
    for key, value in raw.items():
        connector_id = str(key or "").strip().lower()
        result[connector_id] = _hydrate_connector_settings(connector_id, value)
    return result


def redact_connector_settings(settings, connector_id=None):
    connector_id = str(connector_id or settings.get("connector_id") or "").strip().lower()
    secret_fields = _sensitive_fields_for(connector_id)
    redacted = deepcopy(settings if isinstance(settings, dict) else {})
    for field in secret_fields:
        has_key = bool(str(redacted.get(field) or "").strip())
        redacted[field] = ""
        redacted[f"has_{field}"] = has_key
    return redacted


def update_connector_settings(user_id, connector_id, updates):
    state = load_connector_state(user_id)
    connectors = state.setdefault("connectors", {})
    key = str(connector_id or "").strip().lower()
    current_raw = connectors.get(key)
    current = _hydrate_connector_settings(key, current_raw)

    if isinstance(updates, dict):
        for field, value in updates.items():
            current[field] = value

    current["connector_id"] = key
    current["updated_at"] = _iso_now()
    connectors[key] = _persist_connector_settings(key, current)
    save_connector_state(user_id, state)
    return get_connector_settings(user_id, key)


def _next_retry_at(failure_count):
    retries = max(1, _parse_int(failure_count, default=1))
    delay_seconds = min(900, 15 * (2 ** min(retries - 1, 5)))
    return (datetime.utcnow() + timedelta(seconds=delay_seconds)).isoformat()


def mark_connector_sync_result(user_id, connector_id, status, error_message=""):
    now_iso = _iso_now()
    status_key = str(status or "").strip().lower()
    settings = get_connector_settings(user_id, connector_id)
    failure_count = _parse_int(settings.get("consecutive_failures"), default=0)

    if status_key == "success":
        updates = {
            "last_sync_at": now_iso,
            "last_sync_result": "success",
            "health_status": "healthy",
            "consecutive_failures": 0,
            "next_retry_at": None,
            "last_success_at": now_iso,
            "last_error_message": "",
        }
    elif status_key == "skipped":
        updates = {
            "last_sync_at": now_iso,
            "last_sync_result": "skipped",
            "health_status": settings.get("health_status") or "unknown",
            "next_retry_at": settings.get("next_retry_at"),
        }
    else:
        next_failures = failure_count + 1
        updates = {
            "last_sync_at": now_iso,
            "last_sync_result": "failed",
            "health_status": "degraded",
            "consecutive_failures": next_failures,
            "next_retry_at": _next_retry_at(next_failures),
            "last_error_at": now_iso,
            "last_error_message": str(error_message or "")[:1000],
        }

    if status_key != "failed":
        updates.setdefault("last_error_at", settings.get("last_error_at"))

    return update_connector_settings(user_id, connector_id, updates)


def _sanitize_limit(limit):
    value = _parse_int(limit, default=DEFAULT_AUDIT_LIMIT)
    if value < 1:
        return DEFAULT_AUDIT_LIMIT
    return min(value, MAX_AUDIT_LIMIT)


def append_sync_audit_event(
    user_id,
    connector_id,
    action,
    status,
    thread_id=None,
    attempt_count=None,
    duration_ms=None,
    message="",
    metadata=None,
):
    state = load_connector_state(user_id)
    log = state.setdefault("audit_log", [])
    if not isinstance(log, list):
        log = []

    entry = {
        "id": f"audit_{secrets.token_hex(6)}",
        "timestamp": _iso_now(),
        "connector_id": str(connector_id or "").strip().lower(),
        "thread_id": str(thread_id or "").strip() or None,
        "action": str(action or "sync").strip().lower() or "sync",
        "status": str(status or "unknown").strip().lower() or "unknown",
        "attempt_count": _parse_int(attempt_count, default=0) if attempt_count is not None else None,
        "duration_ms": _parse_int(duration_ms, default=0) if duration_ms is not None else None,
        "message": str(message or "")[:1000],
        "metadata": metadata if isinstance(metadata, dict) else {},
    }
    log.insert(0, entry)
    state["audit_log"] = log[:AUDIT_LOG_LIMIT]
    save_connector_state(user_id, state)
    return entry


def get_sync_audit_events(user_id, connector_id=None, thread_id=None, limit=DEFAULT_AUDIT_LIMIT):
    state = load_connector_state(user_id)
    log = state.get("audit_log") if isinstance(state.get("audit_log"), list) else []
    target_connector = str(connector_id or "").strip().lower()
    target_thread = str(thread_id or "").strip()
    rows = []

    for item in log:
        if not isinstance(item, dict):
            continue
        if target_connector and str(item.get("connector_id") or "").strip().lower() != target_connector:
            continue
        if target_thread and str(item.get("thread_id") or "").strip() != target_thread:
            continue
        rows.append(deepcopy(item))

    return rows[:_sanitize_limit(limit)]


def get_thread_sync_profile(user_id, thread_id):
    state = load_connector_state(user_id)
    thread_sync = state.get("thread_sync") or {}
    key = str(thread_id or "").strip()
    current = thread_sync.get(key)
    base = _default_thread_sync_profile(key)
    if isinstance(current, dict):
        base.update(current)
    return base


def update_thread_sync_profile(user_id, thread_id, updates):
    state = load_connector_state(user_id)
    thread_sync = state.setdefault("thread_sync", {})
    key = str(thread_id or "").strip()
    current = get_thread_sync_profile(user_id, key)
    if isinstance(updates, dict):
        for field in (
            "connector_ids",
            "sync_mode",
            "conflict_policy",
            "field_mapping",
            "mirror_external_to_wbs",
            "mirror_wbs_to_external",
            "auto_reconcile",
        ):
            if field in updates:
                current[field] = updates.get(field)
    current["thread_id"] = key
    current["updated_at"] = _iso_now()
    thread_sync[key] = current
    save_connector_state(user_id, state)
    return deepcopy(current)
