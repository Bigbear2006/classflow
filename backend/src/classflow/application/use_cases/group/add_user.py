from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.user_group import UserGroupRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import UserGroup


@dataclass
class AddUserToGroupDTO:
    user_id: int
    group_id: int


class AddUserToGroup:
    def __init__(
        self,
        user_group_repository: UserGroupRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.user_group_repository = user_group_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: AddUserToGroupDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            user_group = UserGroup(
                user_id=data.user_id,
                group_id=data.group_id,
            )
            await self.user_group_repository.create(user_group)
