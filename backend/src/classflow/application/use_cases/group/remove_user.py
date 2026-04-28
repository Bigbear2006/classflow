from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.user_group import UserGroupRepository
from classflow.application.services.permission import PermissionService


@dataclass
class RemoveUserFromGroupDTO:
    user_id: int
    group_id: int


class RemoveUserFromGroup:
    def __init__(
        self,
        user_group_repository: UserGroupRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.user_group_repository = user_group_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: RemoveUserFromGroupDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            await self.user_group_repository.delete(
                data.user_id,
                data.group_id,
            )
