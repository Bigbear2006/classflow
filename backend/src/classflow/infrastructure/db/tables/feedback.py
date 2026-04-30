from sqlalchemy import (
    BIGINT,
    Boolean,
    Column,
    ForeignKeyConstraint,
    Integer,
    Table,
    Text,
    UniqueConstraint,
    text,
)

from classflow.domain.entities import Feedback
from classflow.infrastructure.db.tables.base import (
    created_at_column,
    mapper_registry,
    metadata,
    organization_id_fk,
)

feedback_table = Table(
    'feedback',
    metadata,
    Column('id', BIGINT, primary_key=True),
    organization_id_fk(),
    Column(
        'author_id',
        BIGINT,
        nullable=False,
        index=True,
    ),
    Column(
        'teacher_id',
        BIGINT,
        nullable=True,
        index=True,
    ),
    Column(
        'course_id',
        BIGINT,
        nullable=True,
        index=True,
    ),
    Column('rating', Integer, nullable=False),
    Column('text', Text, nullable=False, server_default=text("''")),
    Column('is_active', Boolean, nullable=False, server_default=text('true')),
    created_at_column(),
    ForeignKeyConstraint(
        ['organization_id', 'author_id'],
        ['organization_members.organization_id', 'organization_members.id'],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'teacher_id'],
        ['organization_members.organization_id', 'organization_members.id'],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'course_id'],
        ['courses.organization_id', 'courses.id'],
    ),
    UniqueConstraint('author_id', 'teacher_id', 'course_id'),
)

mapper_registry.map_imperatively(Feedback, feedback_table)
