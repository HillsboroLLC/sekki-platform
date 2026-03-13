"""refine team models and seat caps

Revision ID: c1f3e9a6d2b7
Revises: a2c4e1d9f0ab
Create Date: 2026-03-13 11:55:00.000000
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "c1f3e9a6d2b7"
down_revision = "a2c4e1d9f0ab"
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column(
        "organizations",
        "slug",
        existing_type=sa.String(length=128),
        type_=sa.String(length=255),
        existing_nullable=True,
    )

    op.add_column("organizations", sa.Column("max_admin_seats", sa.Integer(), nullable=False, server_default="2"))
    op.add_column("organizations", sa.Column("max_creator_seats", sa.Integer(), nullable=False, server_default="5"))
    op.add_column("organizations", sa.Column("max_collaborator_seats", sa.Integer(), nullable=False, server_default="10"))

    op.execute(
        """
        UPDATE organizations
        SET
          max_admin_seats = CASE WHEN LOWER(COALESCE(plan_key, '')) = 'enterprise' THEN 5 ELSE 2 END,
          max_creator_seats = CASE WHEN LOWER(COALESCE(plan_key, '')) = 'enterprise' THEN 25 ELSE 5 END,
          max_collaborator_seats = 10
        """
    )

    op.alter_column(
        "organization_members",
        "role",
        existing_type=sa.String(length=32),
        server_default="collaborator",
        existing_nullable=False,
    )
    op.alter_column(
        "organization_invitations",
        "role",
        existing_type=sa.String(length=32),
        server_default="collaborator",
        existing_nullable=False,
    )


def downgrade():
    op.alter_column(
        "organization_invitations",
        "role",
        existing_type=sa.String(length=32),
        server_default="viewer",
        existing_nullable=False,
    )
    op.alter_column(
        "organization_members",
        "role",
        existing_type=sa.String(length=32),
        server_default="viewer",
        existing_nullable=False,
    )

    op.drop_column("organizations", "max_collaborator_seats")
    op.drop_column("organizations", "max_creator_seats")
    op.drop_column("organizations", "max_admin_seats")

    op.alter_column(
        "organizations",
        "slug",
        existing_type=sa.String(length=255),
        type_=sa.String(length=128),
        existing_nullable=True,
    )
