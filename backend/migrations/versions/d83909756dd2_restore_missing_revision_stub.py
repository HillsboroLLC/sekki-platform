"""Restore missing revision referenced by merge migration.

Revision ID: d83909756dd2
Revises: b2f9a2d4c1ef
Create Date: 2026-03-12 11:30:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'd83909756dd2'
down_revision = 'b2f9a2d4c1ef'
branch_labels = None
depends_on = None

def upgrade():
    pass

def downgrade():
    pass
