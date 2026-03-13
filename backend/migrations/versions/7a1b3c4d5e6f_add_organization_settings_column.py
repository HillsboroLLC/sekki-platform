"""add organization settings column

Revision ID: 7a1b3c4d5e6f
Revises: e6b4a1c8d3f2
Create Date: 2026-03-13 17:35:00.000000
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "7a1b3c4d5e6f"
down_revision = "e6b4a1c8d3f2"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("organizations", sa.Column("settings", sa.JSON(), nullable=True))


def downgrade():
    op.drop_column("organizations", "settings")
