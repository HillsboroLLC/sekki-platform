"""merge heads after jaspen auth and ai-agent migrations

Revision ID: 129ec85ec54b
Revises: ('c7d1d8a9f2be', 'd83909756dd2')
Create Date: 2026-03-08 13:58:22.361755

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '129ec85ec54b'
down_revision = ('c7d1d8a9f2be', 'd83909756dd2')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
