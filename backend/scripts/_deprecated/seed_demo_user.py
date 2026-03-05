# backend/seed_demo_user.py

from app import create_app, db
from app.models import User
from werkzeug.security import generate_password_hash

app = create_app()
app.app_context().push()

demo_email = 'demo@sekki.io'
demo_password = 'demopassword'

# Delete existing demo user if exists
existing_user = User.query.filter_by(email=demo_email).first()
if existing_user:
    db.session.delete(existing_user)
    db.session.commit()

# Create new demo user
demo_user = User(
    email=demo_email,
    name='Demo User',
    password_hash=generate_password_hash(demo_password, method='pbkdf2:sha256'),
    subscription_plan='essential',
    seat_limit=1,
    max_seats=1,
    unlimited_analysis=False,
    max_concurrent_sessions=1,
    credits_remaining=25
)

db.session.add(demo_user)
db.session.commit()

print(f"✅ Demo user created!\nEmail: {demo_email}\nPassword: {demo_password}")
