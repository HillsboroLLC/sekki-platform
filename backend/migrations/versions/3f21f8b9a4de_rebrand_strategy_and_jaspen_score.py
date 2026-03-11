"""Rebrand session payload fields to strategy and jaspen_score

Revision ID: 3f21f8b9a4de
Revises: 129ec85ec54b
Create Date: 2026-03-11 18:20:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "3f21f8b9a4de"
down_revision = "129ec85ec54b"
branch_labels = None
depends_on = None


SESSION_TYPE_KEYS = {"document_type", "docType", "doc_type"}


def _transform_payload(node, *, score_from, score_to, type_from, type_to, parent_key=None):
    if isinstance(node, dict):
        transformed = {}
        for key, value in node.items():
            next_key = score_to if key == score_from else key
            transformed[next_key] = _transform_payload(
                value,
                score_from=score_from,
                score_to=score_to,
                type_from=type_from,
                type_to=type_to,
                parent_key=next_key,
            )
        return transformed

    if isinstance(node, list):
        return [
            _transform_payload(
                item,
                score_from=score_from,
                score_to=score_to,
                type_from=type_from,
                type_to=type_to,
                parent_key=parent_key,
            )
            for item in node
        ]

    if isinstance(node, str) and node == type_from and parent_key in SESSION_TYPE_KEYS:
        return type_to

    return node


def _migrate_payloads(bind, *, score_from, score_to, type_from, type_to):
    inspector = sa.inspect(bind)
    if "user_sessions" not in inspector.get_table_names():
        return

    sessions = sa.table(
        "user_sessions",
        sa.column("id", sa.Integer),
        sa.column("payload", sa.JSON),
    )

    rows = bind.execute(sa.select(sessions.c.id, sessions.c.payload)).mappings().all()
    for row in rows:
        payload = row.get("payload")
        if not isinstance(payload, (dict, list)):
            continue

        migrated = _transform_payload(
            payload,
            score_from=score_from,
            score_to=score_to,
            type_from=type_from,
            type_to=type_to,
        )
        if migrated == payload:
            continue

        bind.execute(
            sessions.update()
            .where(sessions.c.id == row["id"])
            .values(payload=migrated)
        )


def upgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if "user_sessions" not in inspector.get_table_names():
        return

    sessions = sa.table(
        "user_sessions",
        sa.column("document_type", sa.String(length=100)),
    )

    bind.execute(
        sessions.update()
        .where(sessions.c.document_type == "market_iq")
        .values(document_type="strategy")
    )

    _migrate_payloads(
        bind,
        score_from="market_iq_score",
        score_to="jaspen_score",
        type_from="market_iq",
        type_to="strategy",
    )


def downgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if "user_sessions" not in inspector.get_table_names():
        return

    sessions = sa.table(
        "user_sessions",
        sa.column("document_type", sa.String(length=100)),
    )

    bind.execute(
        sessions.update()
        .where(sessions.c.document_type == "strategy")
        .values(document_type="market_iq")
    )

    _migrate_payloads(
        bind,
        score_from="jaspen_score",
        score_to="market_iq_score",
        type_from="strategy",
        type_to="market_iq",
    )
