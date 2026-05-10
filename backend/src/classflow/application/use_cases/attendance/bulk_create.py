from dataclasses import asdict, dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.attendance import AttendanceRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Attendance
from classflow.domain.enums import AttendanceStatus


@dataclass
class CreateAttendanceDTO:
    lesson_id: int
    student_id: int
    status: AttendanceStatus


@dataclass
class BulkCreateAttendanceDTO:
    attendance_list: list[CreateAttendanceDTO]


class BulkCreateAttendance:
    def __init__(
        self,
        attendance_repository: AttendanceRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.attendance_repository = attendance_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(
        self,
        data: BulkCreateAttendanceDTO,
    ) -> list[Attendance]:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            attendance_list = [
                Attendance(**asdict(attendance))
                for attendance in data.attendance_list
            ]
            return await self.attendance_repository.bulk_create(
                attendance_list,
            )
