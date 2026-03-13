import copy
from datetime import datetime

from app.connector_store import connector_api_call


DEFAULT_API_BASE = "/attask/api/v15.0"
DEFAULT_MAPPING = {
    "title": "name",
    "due_date": "plannedCompletionDate",
    "owner": "assignedToID",
    "status": "status",
}


def _text(value):
    return str(value or "").strip()


def _iso_now():
    return datetime.utcnow().isoformat()


def _task_list(project_wbs):
    tasks = project_wbs.get("tasks") if isinstance(project_wbs, dict) else []
    return tasks if isinstance(tasks, list) else []


def _normalize_base_url(base_url):
    root = _text(base_url).rstrip("/")
    if not root:
        return ""
    if "/attask/api/" in root:
        return root
    return f"{root}{DEFAULT_API_BASE}"


def _workfront_headers(api_key):
    token = _text(api_key)
    return {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}",
        "X-API-Key": token,
    }


def _workfront_request(config, method, path, body=None, params=None):
    base_url = _normalize_base_url(
        config.get("base_url")
        or config.get("workfront_base_url")
    )
    if not base_url:
        raise RuntimeError("Missing Workfront base_url")
    api_key = _text(config.get("api_key") or config.get("workfront_api_token"))
    if not api_key:
        raise RuntimeError("Missing Workfront api_key")
    url = f"{base_url}/{str(path or '').lstrip('/')}"
    return connector_api_call(
        method=method,
        url=url,
        headers=_workfront_headers(api_key),
        body=body,
        params=params,
        max_retries=3,
        timeout=20,
    )


def _extract_records(payload):
    data = payload.get("data")
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        nested = data.get("data")
        if isinstance(nested, list):
            return nested
        return [data]
    result = payload.get("result")
    if isinstance(result, list):
        return result
    if isinstance(result, dict):
        return [result]
    return []


def _extract_record_id(record):
    if not isinstance(record, dict):
        return ""
    for key in ("id", "ID", "taskID", "objID"):
        token = _text(record.get(key))
        if token:
            return token
    records = _extract_records({"data": record})
    if records:
        first = records[0] if isinstance(records[0], dict) else {}
        for key in ("id", "ID", "taskID", "objID"):
            token = _text(first.get(key))
            if token:
                return token
    return ""


def _task_payload(thread_id, task, project_id, mapping):
    task_id = _text(task.get("id")) or "task"
    payload = {
        "projectID": _text(project_id),
        "description": f"Synced from Jaspen task {task_id} (thread {thread_id}).",
        "jaspenMetadata": {
            "jaspen_thread_id": _text(thread_id),
            "jaspen_task_id": task_id,
        },
        "tags": [
            f"jaspen_thread_{thread_id}",
            f"jaspen_task_{task_id}",
        ],
    }

    values = {
        "title": _text(task.get("title")) or "Untitled task",
        "due_date": _text(task.get("due_date")) or None,
        "owner": _text(task.get("owner")) or None,
        "status": _text(task.get("status")) or "todo",
    }
    for source_field, target_field in mapping.items():
        key = _text(target_field)
        if not key:
            continue
        value = values.get(source_field)
        if value not in (None, ""):
            payload[key] = value
    return payload


def _validate_config(config):
    base_url = _text(config.get("base_url") or config.get("workfront_base_url"))
    api_key = _text(config.get("api_key") or config.get("workfront_api_token"))
    project_id = _text(config.get("project_id") or config.get("workfront_project_id"))
    return bool(base_url and api_key), bool(project_id)


def workfront_connect(base_url, api_key):
    config = {"base_url": base_url, "api_key": api_key}
    try:
        _workfront_request(config, "GET", "user/search", params={"$$LIMIT": 1})
        return True
    except Exception:
        return False


def workfront_push_wbs(thread_id, wbs_data, config):
    has_runtime, has_project = _validate_config(config if isinstance(config, dict) else {})
    if not has_runtime or not has_project:
        return {
            "success": False,
            "skipped": True,
            "reason": "workfront_config_missing",
            "project_wbs": wbs_data,
        }

    settings = config if isinstance(config, dict) else {}
    mapping = dict(DEFAULT_MAPPING)
    configured_map = settings.get("field_mapping") if isinstance(settings.get("field_mapping"), dict) else {}
    for key, value in configured_map.items():
        source = _text(key)
        target = _text(value)
        if source in mapping and target:
            mapping[source] = target

    updated_wbs = copy.deepcopy(wbs_data) if isinstance(wbs_data, dict) else {"name": "Execution WBS", "tasks": []}
    tasks = _task_list(updated_wbs)
    created = 0
    updated = 0
    errors = []
    max_attempt_count = 1

    project_id = _text(settings.get("project_id") or settings.get("workfront_project_id"))

    for task in tasks:
        if not isinstance(task, dict):
            continue
        task_id = _text(task.get("id"))
        if not task_id:
            continue

        refs = task.get("external_refs") if isinstance(task.get("external_refs"), dict) else {}
        external_id = _text(refs.get("workfront_task_id") or task.get("workfront_task_id"))
        payload = _task_payload(thread_id, task, project_id, mapping)

        try:
            if external_id:
                result = _workfront_request(settings, "PUT", f"task/{external_id}", body=payload)
                updated += 1
            else:
                result = _workfront_request(settings, "POST", "task", body=payload)
                new_id = _extract_record_id(result.get("data") if isinstance(result.get("data"), dict) else result)
                if new_id:
                    refs["workfront_task_id"] = new_id
                    task["external_refs"] = refs
                    created += 1
                    updated += 1
            max_attempt_count = max(max_attempt_count, int(result.get("attempt_count") or 1))
        except Exception as exc:
            errors.append({"task_id": task_id, "error": str(exc)[:800]})

    updated_wbs["updated_at"] = _iso_now()
    return {
        "success": len(errors) == 0,
        "skipped": False,
        "created_tasks": created,
        "updated_tasks": updated,
        "errors": errors,
        "attempt_count": max_attempt_count,
        "duration_ms": 0,
        "project_wbs": updated_wbs,
    }


def workfront_import_tasks(config):
    settings = config if isinstance(config, dict) else {}
    has_runtime, has_project = _validate_config(settings)
    if not has_runtime or not has_project:
        raise RuntimeError("Workfront import requires base_url, api_key, and project_id.")

    project_id = _text(settings.get("project_id") or settings.get("workfront_project_id"))
    response = _workfront_request(
        settings,
        "GET",
        "task/search",
        params={"projectID": project_id, "$$LIMIT": 200},
    )
    records = _extract_records(response.get("data") if isinstance(response.get("data"), dict) else response)
    tasks = []
    for record in records:
        row = record if isinstance(record, dict) else {}
        task_id = _extract_record_id(row)
        tasks.append(
            {
                "external_id": task_id,
                "title": _text(row.get("name") or row.get("title")),
                "status": _text(row.get("status")),
                "owner": _text(row.get("assignedToName") or row.get("ownerName")),
                "due_date": _text(row.get("plannedCompletionDate") or row.get("dueDate")) or None,
                "raw": row,
            }
        )
    return {
        "success": True,
        "tasks": tasks,
        "count": len(tasks),
        "attempt_count": int(response.get("attempt_count") or 1),
    }


def workfront_sync_status(config):
    settings = config if isinstance(config, dict) else {}
    base_url = _text(settings.get("base_url") or settings.get("workfront_base_url"))
    api_key = _text(settings.get("api_key") or settings.get("workfront_api_token"))
    connected = workfront_connect(base_url, api_key)

    status = {
        "connected": connected,
        "last_sync_at": settings.get("last_sync_at"),
        "task_count": 0,
        "status": "healthy" if connected else "degraded",
    }
    if not connected:
        return status

    try:
        imported = workfront_import_tasks(settings)
        status["task_count"] = int(imported.get("count") or 0)
        return status
    except Exception as exc:
        status["status"] = "degraded"
        status["error"] = str(exc)
        return status
