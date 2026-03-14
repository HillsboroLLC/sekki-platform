from app.connector_store import update_connector_settings


def test_admin_user_no_stripe_ids(client, admin_auth_headers, admin_user, test_user, db):
    test_user.stripe_customer_id = "cus_hidden"
    test_user.stripe_subscription_id = "sub_hidden"
    db.session.commit()

    resp = client.get("/api/v1/admin/users", headers=admin_auth_headers)
    assert resp.status_code == 200
    data = resp.get_json()
    for user in data.get("users", []):
        assert "stripe_customer_id" not in user
        assert "stripe_subscription_id" not in user


def test_admin_connectors_no_credentials(client, admin_auth_headers, test_user):
    update_connector_settings(
        test_user.id,
        "jira_sync",
        {
            "connection_status": "connected",
            "auto_sync": True,
            "health_status": "healthy",
            "jira_api_token": "secret-token",
            "jira_email": "hidden@example.com",
            "jira_base_url": "https://example.atlassian.net",
        },
    )

    resp = client.get(f"/api/v1/admin/users/{test_user.id}/connectors", headers=admin_auth_headers)
    assert resp.status_code == 200
    data = resp.get_json()
    for conn in data.get("connectors", []):
        assert "jira_api_token" not in conn
        assert "jira_email" not in conn
        assert "jira_base_url" not in conn
