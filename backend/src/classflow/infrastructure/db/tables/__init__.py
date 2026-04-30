from classflow.infrastructure.db.tables.addresses import (
    addresses_table,
    cabinets_table,
)
from classflow.infrastructure.db.tables.attendance import attendance_table
from classflow.infrastructure.db.tables.base import (
    RawSession,
    mapper_registry,
    metadata,
)
from classflow.infrastructure.db.tables.courses import (
    course_teacher_students_table,
    course_teachers_table,
    courses_table,
)
from classflow.infrastructure.db.tables.feedback import feedback_table
from classflow.infrastructure.db.tables.groups import (
    groups_table,
    student_groups_table,
)
from classflow.infrastructure.db.tables.lessons import (
    lessons_table,
)
from classflow.infrastructure.db.tables.organizations import (
    organization_members_table,
    organizations_table,
)
from classflow.infrastructure.db.tables.payments import payments_table
from classflow.infrastructure.db.tables.subjects import subjects_table
from classflow.infrastructure.db.tables.users import users_table

__all__ = (
    'RawSession',
    'addresses_table',
    'attendance_table',
    'cabinets_table',
    'course_teacher_students_table',
    'course_teachers_table',
    'courses_table',
    'feedback_table',
    'groups_table',
    'lessons_table',
    'mapper_registry',
    'metadata',
    'organization_members_table',
    'organizations_table',
    'payments_table',
    'student_groups_table',
    'subjects_table',
    'users_table',
)
