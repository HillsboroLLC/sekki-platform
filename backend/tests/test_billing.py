def test_stripe_webhook_requires_configured_secret(client, app):
    app.config["STRIPE_WEBHOOK_SECRET"] = ""
    resp = client.post("/api/v1/billing/webhook", data=b"{}")
    assert resp.status_code == 503


def test_stripe_webhook_rejects_invalid_signature(client, app):
    app.config["STRIPE_WEBHOOK_SECRET"] = "whsec_test"
    resp = client.post(
        "/api/v1/billing/webhook",
        data=b"{}",
        headers={"Stripe-Signature": "invalid"},
    )
    assert resp.status_code == 400
