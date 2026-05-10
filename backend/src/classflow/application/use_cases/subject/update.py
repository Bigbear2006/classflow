from dataclasses import dataclass

from classflow.application.common.dto import FileDTO
from classflow.application.common.file_storage import FileStorage
from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.subject import SubjectRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Subject


@dataclass
class UpdateSubjectDTO:
    id: int
    name: str | None = None
    image: FileDTO | None = None
    description: str | None = None


class UpdateSubject:
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

    async def __call__(self, data: UpdateSubjectDTO) -> Subject:
        await self.permission_service.ensure_admin_or_more()

        if data.image:
            subject = await self.subject_repository.get_by_id(data.id)
            await self.file_storage.delete(subject.image)
            image = await self.file_storage.save(
                data.image,
                prefix='subjects/',
            )
        else:
            image = None

        async with self.uow:
            return await self.subject_repository.update(
                data.id,
                name=data.name,
                image=image,
                description=data.description,
            )
