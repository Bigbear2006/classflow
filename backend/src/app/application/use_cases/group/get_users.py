from dataclasses import dataclass

from app.application.repositories.group import GroupRepository
from app.application.services.permission import PermissionService
from app.domain.entities import User


@dataclass
class GetGroupUsersDTO:
    id: int


class GetGroupUsers:
    def __init__(
        self,
        group_repository: GroupRepository,
        permission_service: PermissionService,
    ) -> None:
        self.group_repository = group_repository
        self.permission_service = permission_service

    async def __call__(self, data: GetGroupUsersDTO) -> list[User]:
        await self.permission_service.ensure_admin_or_more()
        return await self.group_repository.get_users(data.id)
