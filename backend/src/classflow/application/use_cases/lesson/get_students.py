from dataclasses import dataclass

from classflow.application.repositories.lesson import LessonRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import OrganizationMember


@dataclass
class GetStudentsWithAttendanceDTO:
    lesson_id: int


class GetStudentsWithAttendance:
    def __init__(
        self,
        lesson_repository: LessonRepository,
        permission_service: PermissionService,
    ) -> None:
        self.lesson_repository = lesson_repository
        self.permission_service = permission_service

    async def __call__(
        self,
        data: GetStudentsWithAttendanceDTO,
    ) -> list[OrganizationMember]:
        await self.permission_service.ensure_admin_or_more()
        return await self.lesson_repository.get_students_with_attendance(
            data.lesson_id,
        )
