from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.student_group import StudentGroupRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import StudentGroup


@dataclass
class AddUserToGroupDTO:
    student_id: int
    group_id: int


class AddUserToGroup:
    def __init__(
        self,
        student_group_repository: StudentGroupRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.student_group_repository = student_group_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: AddUserToGroupDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            user_group = StudentGroup(
                student_id=data.student_id,
                group_id=data.group_id,
            )
            await self.student_group_repository.create(user_group)
