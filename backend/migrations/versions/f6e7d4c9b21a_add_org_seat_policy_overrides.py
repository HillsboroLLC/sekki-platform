"""add organization seat policy overrides

Revision ID: f6e7d4c9b21a
Revises: 8d92c7f4e1aa
Create Date: 2026-03-12 19:45:00.000000
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "f6e7d4c9b21a"
down_revision = "8d92c7f4e1aa"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("organizations", sa.Column("seat_policy_overrides", sa.JSON(), nullable=True))


def downgrade():
    op.drop_column("organizations", "seat_policy_overrides")
