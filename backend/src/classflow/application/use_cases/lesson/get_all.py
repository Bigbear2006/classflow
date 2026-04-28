from dataclasses import dataclass
from datetime import date

from classflow.application.repositories.lesson import LessonRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Lesson


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
        await self.permission_service.ensure_admin_or_more()
        return await self.lesson_repository.get_all(
            start_date=data.start_date,
            end_date=data.end_date,
        )
