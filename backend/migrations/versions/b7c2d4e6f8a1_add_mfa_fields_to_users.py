"""add mfa fields to users

Revision ID: b7c2d4e6f8a1
Revises: 8f1e4a7c2d9b
Create Date: 2026-03-14 12:25:00.000000
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "b7c2d4e6f8a1"
down_revision = "8f1e4a7c2d9b"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("users", sa.Column("mfa_secret", sa.String(length=64), nullable=True))
    op.add_column("users", sa.Column("mfa_enabled", sa.Boolean(), nullable=False, server_default=sa.false()))
    op.add_column("users", sa.Column("mfa_backup_codes", sa.JSON(), nullable=True))
    op.alter_column("users", "mfa_enabled", server_default=None)


def downgrade():
    op.drop_column("users", "mfa_backup_codes")
    op.drop_column("users", "mfa_enabled")
    op.drop_column("users", "mfa_secret")
