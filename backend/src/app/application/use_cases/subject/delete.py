from dataclasses import dataclass

from app.application.common.uow import UnitOfWork
from app.application.repositories.subject import SubjectRepository
from app.application.services.permission import PermissionService


@dataclass
class DeleteSubjectDTO:
    id: int


class DeleteSubject:
    def __init__(
        self,
        subject_repository: SubjectRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.subject_repository = subject_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: DeleteSubjectDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            await self.subject_repository.delete(data.id)
