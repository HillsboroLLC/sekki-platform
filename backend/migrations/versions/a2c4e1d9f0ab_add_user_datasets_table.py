"""add user datasets table

Revision ID: a2c4e1d9f0ab
Revises: f6e7d4c9b21a
Create Date: 2026-03-13 01:00:00.000000
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a2c4e1d9f0ab'
down_revision = 'f6e7d4c9b21a'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'user_datasets',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('user_id', sa.String(length=36), nullable=False),
        sa.Column('filename', sa.String(length=255), nullable=False),
        sa.Column('row_count', sa.Integer(), nullable=False),
        sa.Column('column_names', sa.JSON(), nullable=False),
        sa.Column('data_preview', sa.JSON(), nullable=True),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='ready'),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index('ix_user_datasets_user_id', 'user_datasets', ['user_id'], unique=False)
    op.create_index('ix_user_datasets_created_at', 'user_datasets', ['created_at'], unique=False)


def downgrade():
    op.drop_index('ix_user_datasets_created_at', table_name='user_datasets')
    op.drop_index('ix_user_datasets_user_id', table_name='user_datasets')
    op.drop_table('user_datasets')
