from sqlalchemy import (
    BIGINT,
    Boolean,
    Column,
    ForeignKeyConstraint,
    Integer,
    String,
    Table,
    UniqueConstraint,
    text,
)
from sqlalchemy.orm import relationship

from classflow.domain.entities import Cabinet, Course, Group, StudentGroup
from classflow.infrastructure.db.tables.base import (
    created_at_column,
    mapper_registry,
    metadata,
    organization_id_fk,
)

groups_table = Table(
    'groups',
    metadata,
    Column('id', BIGINT, primary_key=True),
    organization_id_fk(),
    Column('name', String(255), nullable=False),
    Column(
        'course_id',
        BIGINT,
        nullable=False,
        index=True,
    ),
    Column(
        'default_cabinet_id',
        BIGINT,
        nullable=True,
        index=True,
    ),
    Column('max_users_count', Integer, nullable=False),
    created_at_column(),
    ForeignKeyConstraint(
        ['organization_id', 'course_id'],
        ['courses.organization_id', 'courses.id'],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'default_cabinet_id'],
        ['cabinets.organization_id', 'cabinets.id'],
    ),
    UniqueConstraint('organization_id', 'id'),
    UniqueConstraint('organization_id', 'name'),
)

student_groups_table = Table(
    'student_groups',
    metadata,
    Column('id', BIGINT, primary_key=True),
    organization_id_fk(),
    Column(
        'student_id',
        BIGINT,
        nullable=False,
        index=True,
    ),
    Column(
        'group_id',
        BIGINT,
        nullable=False,
        index=True,
    ),
    Column('is_active', Boolean, nullable=False, server_default=text('true')),
    created_at_column(),
    ForeignKeyConstraint(
        ['organization_id', 'student_id'],
        ['organization_members.organization_id', 'organization_members.id'],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'group_id'],
        ['groups.organization_id', 'groups.id'],
    ),
    UniqueConstraint('organization_id', 'id'),
    UniqueConstraint('student_id', 'group_id'),
)


mapper_registry.map_imperatively(
    Group,
    groups_table,
    properties={
        'course': relationship(Course),
        'default_cabinet': relationship(Cabinet),
    },
)

mapper_registry.map_imperatively(StudentGroup, student_groups_table)
