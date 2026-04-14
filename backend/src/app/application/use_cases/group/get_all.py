from app.application.repositories.group import GroupRepository
from app.application.services.permission import PermissionService
from app.domain.entities import Group


class GetAllGroups:
    def __init__(
        self,
        group_repository: GroupRepository,
        permission_service: PermissionService,
    ) -> None:
        self.group_repository = group_repository
        self.permission_service = permission_service

    async def __call__(self) -> list[Group]:
        await self.permission_service.ensure_admin_or_more()
        return await self.group_repository.get_all()
