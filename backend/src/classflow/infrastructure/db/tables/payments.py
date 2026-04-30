from sqlalchemy import (
    BIGINT,
    Column,
    DateTime,
    ForeignKeyConstraint,
    Integer,
    Table,
    text,
)

from classflow.domain.entities import Payment
from classflow.infrastructure.db.tables.base import (
    mapper_registry,
    metadata,
    organization_id_fk,
)

payments_table = Table(
    'payments',
    metadata,
    Column('id', BIGINT, primary_key=True),
    organization_id_fk(),
    Column(
        'student_group_id',
        BIGINT,
        nullable=True,
        index=True,
    ),
    Column(
        'lesson_id',
        BIGINT,
        nullable=True,
        index=True,
    ),
    Column('amount', Integer, nullable=False),
    Column(
        'created_by_id',
        BIGINT,
        nullable=False,
        index=True,
    ),
    Column(
        'date',
        DateTime(timezone=True),
        nullable=False,
        server_default=text('NOW()'),
    ),
    ForeignKeyConstraint(
        ['organization_id', 'student_group_id'],
        ['student_groups.organization_id', 'student_groups.id'],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'lesson_id'],
        ['lessons.organization_id', 'lessons.id'],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'created_by_id'],
        ['organization_members.organization_id', 'organization_members.id'],
    ),
)

mapper_registry.map_imperatively(Payment, payments_table)
