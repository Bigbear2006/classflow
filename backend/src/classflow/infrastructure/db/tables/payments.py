from sqlalchemy import (
    BIGINT,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Table,
    text,
)

from classflow.domain.entities import Payment
from classflow.infrastructure.db.tables.base import mapper_registry, metadata

payments_table = Table(
    'payments',
    metadata,
    Column('id', BIGINT, primary_key=True),
    Column(
        'group_id',
        BIGINT,
        ForeignKey('groups.id'),
        nullable=True,
        index=True,
    ),
    Column(
        'user_id',
        BIGINT,
        ForeignKey('users.id'),
        nullable=True,
        index=True,
    ),
    Column(
        'lesson_id',
        BIGINT,
        ForeignKey('lessons.id'),
        nullable=True,
        index=True,
    ),
    Column('amount', Integer, nullable=False),
    Column(
        'created_by_id',
        BIGINT,
        ForeignKey('users.id'),
        nullable=False,
        index=True,
    ),
    Column(
        'date',
        DateTime(timezone=True),
        nullable=False,
        server_default=text('NOW()'),
    ),
)

mapper_registry.map_imperatively(Payment, payments_table)
