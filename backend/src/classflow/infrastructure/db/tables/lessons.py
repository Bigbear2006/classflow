from sqlalchemy import (
    BIGINT,
    Column,
    DateTime,
    ForeignKeyConstraint,
    String,
    Table,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from classflow.domain.entities import (
    Cabinet,
    CourseTeacherStudent,
    Group,
    Lesson,
    User,
)
from classflow.infrastructure.db.tables.base import (
    created_at_column,
    mapper_registry,
    metadata,
    organization_id_fk,
)

lessons_table = Table(
    'lessons',
    metadata,
    Column('id', BIGINT, primary_key=True),
    organization_id_fk(),
    Column(
        'group_id',
        BIGINT,
        nullable=True,
        index=True,
    ),
    Column(
        'course_teacher_student_id',
        BIGINT,
        nullable=True,
        index=True,
    ),
    Column(
        'cabinet_id',
        BIGINT,
        nullable=True,
        index=True,
    ),
    Column('url', String(500), nullable=True),
    Column(
        'conducted_by_id',
        BIGINT,
        nullable=False,
        index=True,
    ),
    Column('start_date', DateTime(timezone=True), nullable=False),
    Column('end_date', DateTime(timezone=True), nullable=False),
    created_at_column(),
    ForeignKeyConstraint(
        ['organization_id', 'group_id'],
        ['groups.organization_id', 'groups.id'],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'course_teacher_student_id'],
        [
            'course_teacher_students.organization_id',
            'course_teacher_students.id',
        ],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'cabinet_id'],
        ['cabinets.organization_id', 'cabinets.id'],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'conducted_by_id'],
        ['organization_members.organization_id', 'organization_members.id'],
    ),
    UniqueConstraint('organization_id', 'id'),
)

mapper_registry.map_imperatively(
    Lesson,
    lessons_table,
    properties={
        'group': relationship(Group),
        'course_teacher_student': relationship(CourseTeacherStudent),
        'cabinet': relationship(Cabinet),
        'conducted_by': relationship(User),
    },
)
