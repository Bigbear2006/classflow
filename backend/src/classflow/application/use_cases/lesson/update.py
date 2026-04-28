from dataclasses import asdict, dataclass
from datetime import datetime

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.lesson import LessonRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Lesson


@dataclass
class UpdateLessonDto:
    id: int
    conducted_by_id: int
    start_date: datetime
    end_date: datetime
    cabinet_id: int | None = None
    url: str | None = None
    group_id: int | None = None
    course_teacher_student_id: int | None = None


class UpdateLesson:
    def __init__(
        self,
        lesson_repository: LessonRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.lesson_repository = lesson_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: UpdateLessonDto) -> Lesson:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            return await self.lesson_repository.update(**asdict(data))
