from dataclasses import dataclass

from app.application.common.uow import UnitOfWork
from app.application.repositories.lesson import LessonRepository
from app.application.services.permission import PermissionService


@dataclass
class DeleteLessonDTO:
    id: int


class DeleteLesson:
    def __init__(
        self,
        lesson_repository: LessonRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.lesson_repository = lesson_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: DeleteLessonDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            await self.lesson_repository.delete(data.id)
