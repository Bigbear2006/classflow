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
        member = await self.permission_service.ensure_teacher_or_more()

        if member.is_teacher:
            lesson = await self.lesson_repository.get(data.lesson_id)
            lesson.ensure_teacher_access(member.id)

        return await self.lesson_repository.get_students_with_attendance(
            data.lesson_id,
        )
