from dataclasses import asdict, dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.subject import SubjectRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Subject


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
            return await self.subject_repository.update(**asdict(data))
