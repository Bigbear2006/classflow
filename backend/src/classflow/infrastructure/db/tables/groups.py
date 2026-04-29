from sqlalchemy import (
    BIGINT,
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
    Table,
    text,
)
from sqlalchemy.orm import relationship

from classflow.domain.entities import Cabinet, Course, Group, UserGroup
from classflow.infrastructure.db.tables.base import (
    created_at_column,
    mapper_registry,
    metadata,
)

groups_table = Table(
    'groups',
    metadata,
    Column('id', BIGINT, primary_key=True),
    Column('name', String(255), nullable=False),
    Column(
        'course_id',
        BIGINT,
        ForeignKey('courses.id'),
        nullable=False,
        index=True,
    ),
    Column(
        'default_cabinet_id',
        BIGINT,
        ForeignKey('cabinets.id'),
        nullable=True,
        index=True,
    ),
    Column('max_users_count', Integer, nullable=False),
    created_at_column(),
)

user_groups_table = Table(
    'user_groups',
    metadata,
    Column('id', BIGINT, primary_key=True),
    Column(
        'user_id',
        BIGINT,
        ForeignKey('users.id'),
        nullable=False,
        index=True,
    ),
    Column(
        'group_id',
        BIGINT,
        ForeignKey('groups.id'),
        nullable=False,
        index=True,
    ),
    Column('is_active', Boolean, nullable=False, server_default=text('true')),
    created_at_column(),
)


mapper_registry.map_imperatively(
    Group,
    groups_table,
    properties={
        'course': relationship(Course),
        'default_cabinet': relationship(Cabinet),
    },
)

mapper_registry.map_imperatively(UserGroup, user_groups_table)
