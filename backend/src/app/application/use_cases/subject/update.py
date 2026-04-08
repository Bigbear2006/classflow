from dataclasses import dataclass

from app.application.common.uow import UnitOfWork
from app.application.repositories.subject import SubjectRepository
from app.application.services.permission import PermissionService
from app.domain.entities import Subject


@dataclass
class UpdateSubjectDTO:
    id: int
    name: str | None = None
    image: str | None = None
    description: str | None = None


class UpdateSubject:
    def __init__(
        self,
        subject_repository: SubjectRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.subject_repository = subject_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: UpdateSubjectDTO) -> Subject:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            return await self.subject_repository.update(
                data.id,
                name=data.name,
                image=data.image,
                description=data.description,
            )
