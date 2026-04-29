from sqlalchemy import (
    BIGINT,
    Column,
    DateTime,
    ForeignKey,
    String,
    Table,
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
)

lessons_table = Table(
    'lessons',
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
        'course_teacher_student_id',
        BIGINT,
        ForeignKey('course_teacher_students.id'),
        nullable=True,
        index=True,
    ),
    Column(
        'cabinet_id',
        BIGINT,
        ForeignKey('cabinets.id'),
        nullable=True,
        index=True,
    ),
    Column('url', String(500), nullable=True),
    Column(
        'conducted_by_id',
        BIGINT,
        ForeignKey('users.id'),
        nullable=False,
        index=True,
    ),
    Column('start_date', DateTime(timezone=True), nullable=False),
    Column('end_date', DateTime(timezone=True), nullable=False),
    created_at_column(),
)

mapper_registry.map_imperatively(
    Lesson,
    lessons_table,
    properties={
        'conducted_by': relationship(User),
        'cabinet': relationship(Cabinet),
        'group': relationship(Group),
        'course_teacher_student': relationship(CourseTeacherStudent),
    },
)
