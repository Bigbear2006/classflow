from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.group import GroupRepository
from classflow.application.services.permission import PermissionService


@dataclass
class DeleteGroupDTO:
    id: int


class DeleteGroup:
    def __init__(
        self,
        group_repository: GroupRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.group_repository = group_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: DeleteGroupDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            return await self.group_repository.delete(data.id)
