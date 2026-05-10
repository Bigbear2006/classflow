from dataclasses import dataclass
from datetime import date

from classflow.application.repositories.lesson import LessonRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Lesson
from classflow.domain.exceptions import PermissionDeniedError


@dataclass
class GetAllLessonsDTO:
    start_date: date | None = None
    end_date: date | None = None


class GetAllLessons:
    def __init__(
        self,
        lesson_repository: LessonRepository,
        permission_service: PermissionService,
    ) -> None:
        self.lesson_repository = lesson_repository
        self.permission_service = permission_service

    async def __call__(self, data: GetAllLessonsDTO) -> list[Lesson]:
        member = await self.permission_service.get_current_member()
        if member.is_student:
            return await self.lesson_repository.get_student_lessons(
                member.id,
                start_date=data.start_date,
                end_date=data.end_date,
            )
        elif member.is_teacher:
            return await self.lesson_repository.get_teacher_lessons(
                member.id,
                start_date=data.start_date,
                end_date=data.end_date,
            )
        elif member.is_admin_or_more:
            return await self.lesson_repository.get_all(
                start_date=data.start_date,
                end_date=data.end_date,
            )
        else:
            raise PermissionDeniedError()
