from dataclasses import dataclass

from classflow.application.common.dto import FileDTO
from classflow.application.common.file_storage import FileStorage
from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.subject import SubjectRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Subject


@dataclass
class CreateSubjectDTO:
    name: str
    image: FileDTO
    description: str


class CreateSubject:
    def __init__(
        self,
        subject_repository: SubjectRepository,
        file_storage: FileStorage,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.subject_repository = subject_repository
        self.file_storage = file_storage
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: CreateSubjectDTO) -> Subject:
        await self.permission_service.ensure_admin_or_more()
        filename = await self.file_storage.save(data.image, prefix='subjects/')
        async with self.uow:
            subject = Subject(
                name=data.name,
                image=filename,
                description=data.description,
            )
            return await self.subject_repository.create(subject)
