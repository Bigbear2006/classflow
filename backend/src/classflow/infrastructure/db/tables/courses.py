from sqlalchemy import (
    BIGINT,
    Column,
    Enum,
    ForeignKeyConstraint,
    Integer,
    Interval,
    Table,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from classflow.domain.entities import (
    Course,
    CourseTeacher,
    CourseTeacherStudent,
    Lesson,
    OrganizationMember,
    Payment,
    Subject,
)
from classflow.domain.enums import (
    CoursePaymentType,
    CourseTeacherStatus,
    CourseType,
    LessonType,
)
from classflow.infrastructure.db.tables.base import (
    created_at_column,
    mapper_registry,
    metadata,
    organization_id_fk,
    student_status_enum,
)

course_type_enum = Enum(CourseType, name='course_type')
lesson_type_enum = Enum(LessonType, name='lesson_type')
course_payment_type_enum = Enum(CoursePaymentType, name='course_payment_type')
course_teacher_status_enum = Enum(
    CourseTeacherStatus,
    name='course_teacher_status',
)

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
    Column('status', course_teacher_status_enum, nullable=False),
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
    Column('status', student_status_enum, nullable=False),
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
    properties={
        'subject': relationship(Subject, viewonly=True),
        'teachers': relationship(
            CourseTeacher,
            back_populates='course',
            viewonly=True,
        ),
    },
)

mapper_registry.map_imperatively(
    CourseTeacher,
    course_teachers_table,
    properties={
        'course': relationship(
            Course,
            back_populates='teachers',
            viewonly=True,
        ),
        'teacher': relationship(OrganizationMember, viewonly=True),
        'students': relationship(
            CourseTeacherStudent,
            back_populates='course_teacher',
            viewonly=True,
        ),
    },
)

mapper_registry.map_imperatively(
    CourseTeacherStudent,
    course_teacher_students_table,
    properties={
        'course_teacher': relationship(
            CourseTeacher,
            back_populates='students',
            viewonly=True,
        ),
        'student': relationship(OrganizationMember, viewonly=True),
        'lessons': relationship(Lesson, viewonly=True),
        'payments': relationship(Payment, viewonly=True),
    },
)
