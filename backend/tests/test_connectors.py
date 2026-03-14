def test_connector_status_returns_catalog(client, auth_headers):
    resp = client.get("/api/v1/connectors/status", headers=auth_headers)
    assert resp.status_code == 200
    data = resp.get_json()
    assert "connectors" in data


def test_jira_webhook_requires_configured_secret(client, app):
    app.config["JIRA_WEBHOOK_SECRET"] = ""
    resp = client.post("/api/v1/connectors/jira/webhook", json={})
    assert resp.status_code == 503


def test_jira_webhook_rejects_invalid_secret(client, app):
    app.config["JIRA_WEBHOOK_SECRET"] = "expected-secret"
    resp = client.post(
        "/api/v1/connectors/jira/webhook",
        json={},
        headers={"X-Webhook-Secret": "wrong-secret"},
    )
    assert resp.status_code == 401
