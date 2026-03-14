def test_signup_success(client):
    resp = client.post(
        "/api/v1/auth/signup",
        json={
            "name": "New User",
            "email": "new@example.com",
            "password": "StrongPass1",
            "plan_key": "free",
        },
    )
    assert resp.status_code == 201
    assert "token" in resp.get_json()


def test_signup_weak_password(client):
    resp = client.post(
        "/api/v1/auth/signup",
        json={
            "name": "New User",
            "email": "weak@example.com",
            "password": "abc",
            "plan_key": "free",
        },
    )
    assert resp.status_code == 400


def test_signup_invalid_email(client):
    resp = client.post(
        "/api/v1/auth/signup",
        json={
            "name": "Bad Email",
            "email": "notanemail",
            "password": "StrongPass1",
            "plan_key": "free",
        },
    )
    assert resp.status_code == 400


def test_login_success(client, test_user):
    resp = client.post(
        "/api/v1/auth/login",
        json={
            "email": "test@example.com",
            "password": "ValidPass1",
        },
    )
    assert resp.status_code == 200
    assert "token" in resp.get_json()


def test_login_wrong_password(client, test_user):
    resp = client.post(
        "/api/v1/auth/login",
        json={
            "email": "test@example.com",
            "password": "WrongPass1",
        },
    )
    assert resp.status_code == 401


def test_login_lockout(client, test_user):
    for _ in range(5):
        client.post(
            "/api/v1/auth/login",
            json={
                "email": "test@example.com",
                "password": "WrongPass1",
            },
        )

    resp = client.post(
        "/api/v1/auth/login",
        json={
            "email": "test@example.com",
            "password": "ValidPass1",
        },
    )
    assert resp.status_code == 429
