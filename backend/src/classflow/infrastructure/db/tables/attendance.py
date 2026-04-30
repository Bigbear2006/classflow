from sqlalchemy import (
    BIGINT,
    Column,
    Enum,
    ForeignKeyConstraint,
    Table,
    Text,
    UniqueConstraint,
    text,
)

from classflow.domain.entities import (
    Attendance,
)
from classflow.domain.enums import AttendanceStatus
from classflow.infrastructure.db.tables.base import (
    mapper_registry,
    metadata,
    organization_id_fk,
)

attendance_status_enum = Enum(AttendanceStatus, name='attendance_status')

attendance_table = Table(
    'attendance',
    metadata,
    Column('id', BIGINT, primary_key=True),
    organization_id_fk(),
    Column(
        'lesson_id',
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
    Column('status', attendance_status_enum, nullable=False),
    Column('comment', Text, nullable=False, server_default=text("''")),
    ForeignKeyConstraint(
        ['organization_id', 'lesson_id'],
        ['lessons.organization_id', 'lessons.id'],
    ),
    ForeignKeyConstraint(
        ['organization_id', 'student_id'],
        ['organization_members.organization_id', 'organization_members.id'],
    ),
    UniqueConstraint('lesson_id', 'student_id'),
)

mapper_registry.map_imperatively(Attendance, attendance_table)
