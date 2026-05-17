from classflow.application.repositories.attendance import AttendanceRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import CourseAttendanceStats


class GetAttendanceStats:
    def __init__(
        self,
        attendance_repository: AttendanceRepository,
        permission_service: PermissionService,
    ) -> None:
        self.attendance_repository = attendance_repository
        self.permission_service = permission_service

    async def __call__(self) -> list[CourseAttendanceStats]:
        student = await self.permission_service.ensure_student()
        return await self.attendance_repository.get_courses_stats(student.id)
