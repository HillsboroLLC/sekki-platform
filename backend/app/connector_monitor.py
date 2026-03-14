from datetime import datetime, timezone

from app.connector_registry import get_connector_catalog, get_connector_definition
from app.connector_store import load_user_connectors
from app.models import ConnectorSyncLog

STALE_SYNC_HOURS = 24
FAILURE_ALERT_THRESHOLD = 3
KPI_DRIFT_PERCENT = 15


def _utc_now():
    return datetime.now(timezone.utc)


def _parse_datetime(value):
    text = str(value or "").strip()
    if not text:
        return None
    try:
        parsed = datetime.fromisoformat(text)
    except Exception:
        return None
    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def _connector_snapshot(connector_id, state):
    meta = get_connector_definition(connector_id) or {"id": connector_id, "label": connector_id, "group": "data"}
    current = state if isinstance(state, dict) else {}
    return {
        "id": connector_id,
        "label": meta.get("label") or connector_id,
        "group": meta.get("group") or "data",
        "supports_pm_sync": bool(meta.get("supports_pm_sync")),
        "connection_status": str(current.get("connection_status") or "disconnected"),
        "health_status": str(current.get("health_status") or "unknown"),
        "last_sync_at": current.get("last_sync_at"),
        "consecutive_failures": int(current.get("consecutive_failures") or 0),
        "auto_sync": bool(current.get("auto_sync", True)),
        "sync_mode": current.get("sync_mode"),
        "last_error_message": str(current.get("last_error_message") or "").strip(),
    }


def _add_alert(alerts, connector_id, alert_type, severity, message, action):
    alerts.append({
        "connector_id": connector_id,
        "type": alert_type,
        "severity": severity,
        "message": message,
        "action": action,
    })


def check_connector_health(user_id):
    store = load_user_connectors(user_id)
    connector_states = store.get("connectors", {}) if isinstance(store, dict) else {}
    alerts = []
    connector_reports = []
    alert_counts = {}

    for meta in get_connector_catalog():
        connector_id = meta.get("id")
        if not connector_id:
            continue
        state = connector_states.get(connector_id, {})
        snapshot = _connector_snapshot(connector_id, state)

        if snapshot["connection_status"] == "connected":
            last_sync_dt = _parse_datetime(snapshot.get("last_sync_at"))
            if last_sync_dt:
                age_hours = (_utc_now() - last_sync_dt).total_seconds() / 3600
                if age_hours > STALE_SYNC_HOURS:
                    _add_alert(
                        alerts,
                        connector_id,
                        "stale_sync",
                        "warning",
                        f"Last sync was {int(age_hours)} hours ago. Data may be outdated.",
                        "Re-sync now or check auto-sync settings.",
                    )

            failures = snapshot.get("consecutive_failures", 0)
            if failures >= FAILURE_ALERT_THRESHOLD:
                _add_alert(
                    alerts,
                    connector_id,
                    "connection_failure",
                    "critical",
                    f"Connector has failed {failures} consecutive times: {snapshot.get('last_error_message') or 'Unknown error'}",
                    "Check credentials and network connectivity.",
                )

            if snapshot.get("health_status") == "degraded":
                _add_alert(
                    alerts,
                    connector_id,
                    "degraded_health",
                    "warning",
                    "Connector is experiencing intermittent issues.",
                    "Monitor closely. May resolve automatically.",
                )

        connector_reports.append(snapshot)

    for alert in alerts:
        key = str(alert.get("connector_id") or "")
        alert_counts[key] = int(alert_counts.get(key) or 0) + 1

    for report in connector_reports:
        report["alert_count"] = int(alert_counts.get(report["id"]) or 0)
        if report["connection_status"] != "connected":
            report["status_badge"] = "red"
        elif report["alert_count"] > 0 or report["health_status"] == "degraded":
            report["status_badge"] = "yellow"
        else:
            report["status_badge"] = "green"

    return {
        "user_id": user_id,
        "checked_at": _utc_now().isoformat(),
        "total_connected": sum(1 for item in connector_reports if item.get("connection_status") == "connected"),
        "connectors": connector_reports,
        "alerts": alerts,
        "healthy": len(alerts) == 0,
    }


def generate_connector_insights(user_id, connector_id, thread_id=None):
    store = load_user_connectors(user_id)
    connector_state = (store.get("connectors") or {}).get(connector_id, {})

    if str(connector_state.get("connection_status") or "disconnected") != "connected":
        return {
            "connector_id": connector_id,
            "generated_at": _utc_now().isoformat(),
            "insights": [],
            "status": "disconnected",
        }

    query = (
        ConnectorSyncLog.query
        .filter_by(
            user_id=user_id,
            connector_id=connector_id,
            status="success",
        )
        .order_by(ConnectorSyncLog.created_at.desc())
    )
    if thread_id:
        query = query.filter_by(thread_id=str(thread_id))
    recent_logs = query.limit(10).all()

    insights = []
    trend_direction = "flat"

    if len(recent_logs) >= 2:
        latest_count = recent_logs[0].items_synced or 0
        previous_avg = sum(item.items_synced or 0 for item in recent_logs[1:]) / max(len(recent_logs) - 1, 1)
        if previous_avg > 0:
            drift = ((latest_count - previous_avg) / previous_avg) * 100
            if abs(drift) > KPI_DRIFT_PERCENT:
                trend_direction = "up" if drift > 0 else "down"
                direction = "increased" if drift > 0 else "decreased"
                insights.append({
                    "type": "sync_volume_drift",
                    "severity": "info" if drift > 0 else "warning",
                    "message": f"Sync volume has {direction} by {abs(drift):.0f}% compared to recent average.",
                    "detail": f"Latest: {latest_count} items, Avg: {previous_avg:.0f} items",
                    "trend_direction": trend_direction,
                    "drift_percent": round(drift, 2),
                })

    return {
        "connector_id": connector_id,
        "generated_at": _utc_now().isoformat(),
        "insights": insights,
        "status": "connected",
        "trend_direction": trend_direction,
    }
