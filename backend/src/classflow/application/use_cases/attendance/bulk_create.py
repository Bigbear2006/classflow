from dataclasses import asdict, dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.attendance import AttendanceRepository
from classflow.application.repositories.lesson import LessonRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Attendance
from classflow.domain.enums import AttendanceStatus


@dataclass
class CreateAttendanceDTO:
    student_id: int
    status: AttendanceStatus


@dataclass
class BulkCreateAttendanceDTO:
    attendance_list: list[CreateAttendanceDTO]
    lesson_id: int


class BulkCreateAttendance:
    def __init__(
        self,
        attendance_repository: AttendanceRepository,
        lesson_repository: LessonRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.attendance_repository = attendance_repository
        self.lesson_repository = lesson_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(
        self,
        data: BulkCreateAttendanceDTO,
    ) -> list[Attendance]:
        member = await self.permission_service.ensure_teacher_or_more()

        if member.is_teacher:
            lesson = await self.lesson_repository.get(data.lesson_id)
            lesson.ensure_teacher_access(member.id)

        async with self.uow:
            attendance_list = [
                Attendance(**asdict(attendance), lesson_id=data.lesson_id)
                for attendance in data.attendance_list
            ]
            return await self.attendance_repository.bulk_create(
                attendance_list,
            )
