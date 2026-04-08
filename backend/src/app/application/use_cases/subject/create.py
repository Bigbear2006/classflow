from dataclasses import asdict, dataclass

from app.application.common.org_id_provider import OrganizationIdProvider
from app.application.common.uow import UnitOfWork
from app.application.repositories.subject import SubjectRepository
from app.application.services.permission import PermissionService
from app.domain.entities import Subject


@dataclass
class CreateSubjectDTO:
    name: str
    image: str
    description: str


class CreateSubject:
    def __init__(
        self,
        subject_repository: SubjectRepository,
        org_id_provider: OrganizationIdProvider,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.subject_repository = subject_repository
        self.org_id_provider = org_id_provider
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: CreateSubjectDTO) -> Subject:
        await self.permission_service.ensure_admin_or_more()
        org_id = await self.org_id_provider.get_current_organization_id()
        async with self.uow:
            subject = Subject(organization_id=org_id, **asdict(data))
            return await self.subject_repository.create(subject)
