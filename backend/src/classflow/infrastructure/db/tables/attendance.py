from sqlalchemy import (
    BIGINT,
    Column,
    Enum,
    ForeignKey,
    Table,
    Text,
    text,
)

from classflow.domain.entities import (
    Attendance,
)
from classflow.domain.enums import AttendanceStatus
from classflow.infrastructure.db.tables.base import mapper_registry, metadata

attendance_status_enum = Enum(AttendanceStatus, name='attendance_status')

attendance_table = Table(
    'attendance',
    metadata,
    Column('id', BIGINT, primary_key=True),
    Column(
        'lesson_id',
        BIGINT,
        ForeignKey('lessons.id'),
        nullable=False,
        index=True,
    ),
    Column(
        'user_id',
        BIGINT,
        ForeignKey('users.id'),
        nullable=False,
        index=True,
    ),
    Column('status', attendance_status_enum, nullable=False),
    Column('comment', Text, nullable=False, server_default=text("''")),
)

mapper_registry.map_imperatively(Attendance, attendance_table)
