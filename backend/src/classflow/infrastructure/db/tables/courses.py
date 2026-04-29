from sqlalchemy import (
    BIGINT,
    Boolean,
    Column,
    Enum,
    ForeignKey,
    Integer,
    Interval,
    Table,
    text,
)
from sqlalchemy.orm import relationship

from classflow.domain.entities import (
    Course,
    CourseTeacher,
    CourseTeacherStudent,
    Subject,
    User,
)
from classflow.domain.enums import CoursePaymentType, CourseType, LessonType
from classflow.infrastructure.db.tables.base import (
    created_at_column,
    mapper_registry,
    metadata,
)

course_type_enum = Enum(CourseType, name='course_type')
lesson_type_enum = Enum(LessonType, name='lesson_type')
course_payment_type_enum = Enum(CoursePaymentType, name='course_payment_type')

courses_table = Table(
    'courses',
    metadata,
    Column('id', BIGINT, primary_key=True),
    Column(
        'subject_id',
        BIGINT,
        ForeignKey('subjects.id'),
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
)

course_teachers_table = Table(
    'course_teachers',
    metadata,
    Column('id', BIGINT, primary_key=True),
    Column(
        'course_id',
        BIGINT,
        ForeignKey('courses.id'),
        nullable=False,
        index=True,
    ),
    Column(
        'teacher_id',
        BIGINT,
        ForeignKey('users.id'),
        nullable=False,
        index=True,
    ),
    Column('is_active', Boolean, nullable=False, server_default=text('true')),
    created_at_column(),
)

course_teacher_students_table = Table(
    'course_teacher_students',
    metadata,
    Column('id', BIGINT, primary_key=True),
    Column(
        'course_teacher_id',
        BIGINT,
        ForeignKey('course_teachers.id'),
        nullable=False,
        index=True,
    ),
    Column(
        'student_id',
        BIGINT,
        ForeignKey('users.id'),
        nullable=False,
        index=True,
    ),
    created_at_column(),
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
        'teacher': relationship(User),
    },
)

mapper_registry.map_imperatively(
    CourseTeacherStudent,
    course_teacher_students_table,
    properties={
        'course_teacher': relationship(CourseTeacher),
        'student': relationship(User),
    },
)
