from sqlalchemy import (
    BIGINT,
    Boolean,
    Column,
    ForeignKey,
    Integer,
    Table,
    Text,
    text,
)

from classflow.domain.entities import Feedback
from classflow.infrastructure.db.tables.base import (
    created_at_column,
    mapper_registry,
    metadata,
)

feedback_table = Table(
    'feedback',
    metadata,
    Column('id', BIGINT, primary_key=True),
    Column(
        'author_id',
        BIGINT,
        ForeignKey('users.id'),
        nullable=False,
        index=True,
    ),
    Column(
        'teacher_id',
        BIGINT,
        ForeignKey('users.id'),
        nullable=True,
        index=True,
    ),
    Column(
        'course_id',
        BIGINT,
        ForeignKey('courses.id'),
        nullable=True,
        index=True,
    ),
    Column('rating', Integer, nullable=False),
    Column('text', Text, nullable=False, server_default=text("''")),
    Column('is_active', Boolean, nullable=False, server_default=text('true')),
    created_at_column(),
)

mapper_registry.map_imperatively(Feedback, feedback_table)
