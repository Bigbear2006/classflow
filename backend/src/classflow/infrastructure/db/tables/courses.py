from sqlalchemy import (
    BIGINT,
    Boolean,
    Column,
    Enum,
    ForeignKeyConstraint,
    Integer,
    Interval,
    Table,
    UniqueConstraint,
    text,
)
from sqlalchemy.orm import relationship

from classflow.domain.entities import (
    Course,
    CourseTeacher,
    CourseTeacherStudent,
    OrganizationMember,
    Subject,
)
from classflow.domain.enums import CoursePaymentType, CourseType, LessonType
from classflow.infrastructure.db.tables.base import (
    created_at_column,
    mapper_registry,
    metadata,
    organization_id_fk,
)

course_type_enum = Enum(CourseType, name='course_type')
lesson_type_enum = Enum(LessonType, name='lesson_type')
course_payment_type_enum = Enum(CoursePaymentType, name='course_payment_type')

courses_table = Table(
    'courses',
    metadata,
    Column('id', BIGINT, primary_key=True),
    organization_id_fk(),
    Column(
        'subject_id',
        BIGINT,
        nullable=False,
        index=True,
    ),
    Column('type', course_type_enum, nullable=False),
    Column('price', Integer, nullable=False),
    Column('payment_type', course_payment_type_enum, nullable=False),
    Column('lesson_type', lesson_type_enum, nullable=False),
    Column('lesson_duration', Interval, nullable=False),
    Column('lessons_count', Integer, nullable=True),
    Column('duration', Interval, nullable=True),
    created_at_column(),
    ForeignKeyConstraint(
        ['organization_id', 'subject_id'],
        ['subjects.organization_id', 'subjects.id'],
    ),
    UniqueConstraint('organization_id', 'id'),
)

course_teachers_table = Table(
    'course_teachers',
    metadata,
    Column('id', BIGINT, primary_key=True),
    organization_id_fk(),
    Column(
        'course_id',
        BIGINT,
        nullable=False,
        index=True,
    ),
    Column(
        'teacher_id',
        BIGINT,
        nullable=False,
        index=True,
    ),
    Column('is_active', Boolean, nullable=False, server_default=text('true')),
    created_at_column(),
    ForeignKeyConstraint(
        ['organization_id', 'course_id'],
        ['courses.organization_id', 'courses.id'],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'teacher_id'],
        ['organization_members.organization_id', 'organization_members.id'],
    ),
    UniqueConstraint('organization_id', 'id'),
    UniqueConstraint('course_id', 'teacher_id'),
)

course_teacher_students_table = Table(
    'course_teacher_students',
    metadata,
    organization_id_fk(),
    Column('id', BIGINT, primary_key=True),
    Column(
        'course_teacher_id',
        BIGINT,
        nullable=False,
        index=True,
    ),
    Column(
        'student_id',
        BIGINT,
        nullable=False,
        index=True,
    ),
    created_at_column(),
    ForeignKeyConstraint(
        ['organization_id', 'course_teacher_id'],
        ['course_teachers.organization_id', 'course_teachers.id'],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'student_id'],
        ['organization_members.organization_id', 'organization_members.id'],
    ),
    UniqueConstraint('organization_id', 'id'),
    UniqueConstraint('course_teacher_id', 'student_id'),
)

mapper_registry.map_imperatively(
    Course,
    courses_table,
    properties={'subject': relationship(Subject)},
)

mapper_registry.map_imperatively(
    CourseTeacher,
    course_teachers_table,
    properties={
        'course': relationship(Course),
        'teacher': relationship(OrganizationMember),
    },
)

mapper_registry.map_imperatively(
    CourseTeacherStudent,
    course_teacher_students_table,
    properties={
        'course_teacher': relationship(CourseTeacher),
        'student': relationship(OrganizationMember),
    },
)
