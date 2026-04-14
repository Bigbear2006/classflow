from dataclasses import dataclass

from app.application.repositories.group import GroupRepository
from app.application.services.permission import PermissionService
from app.domain.entities import Group


@dataclass
class GetGroupByIdDTO:
    id: int


class GetGroupById:
    def __init__(
        self,
        group_repository: GroupRepository,
        permission_service: PermissionService,
    ) -> None:
        self.group_repository = group_repository
        self.permission_service = permission_service

    async def __call__(self, data: GetGroupByIdDTO) -> Group:
        await self.permission_service.ensure_admin_or_more()
        return await self.group_repository.get_by_id(data.id)
