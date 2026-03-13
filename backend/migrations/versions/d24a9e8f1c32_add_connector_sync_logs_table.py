"""add connector sync logs table

Revision ID: d24a9e8f1c32
Revises: c1f3e9a6d2b7
Create Date: 2026-03-13 13:20:00.000000
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "d24a9e8f1c32"
down_revision = "c1f3e9a6d2b7"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "connector_sync_logs",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("connector_id", sa.String(length=100), nullable=False),
        sa.Column("thread_id", sa.String(length=255), nullable=True),
        sa.Column("action", sa.String(length=100), nullable=False),
        sa.Column("status", sa.String(length=50), nullable=False),
        sa.Column("items_synced", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("error_message", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_connector_sync_logs_user_id", "connector_sync_logs", ["user_id"])
    op.create_index("ix_connector_sync_logs_connector_id", "connector_sync_logs", ["connector_id"])
    op.create_index("ix_connector_sync_logs_thread_id", "connector_sync_logs", ["thread_id"])
    op.create_index("ix_connector_sync_logs_created_at", "connector_sync_logs", ["created_at"])


def downgrade():
    op.drop_index("ix_connector_sync_logs_created_at", table_name="connector_sync_logs")
    op.drop_index("ix_connector_sync_logs_thread_id", table_name="connector_sync_logs")
    op.drop_index("ix_connector_sync_logs_connector_id", table_name="connector_sync_logs")
    op.drop_index("ix_connector_sync_logs_user_id", table_name="connector_sync_logs")
    op.drop_table("connector_sync_logs")
