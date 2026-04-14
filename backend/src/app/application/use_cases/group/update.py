from dataclasses import asdict, dataclass

from app.application.common.uow import UnitOfWork
from app.application.repositories.group import GroupRepository
from app.application.services.permission import PermissionService
from app.domain.entities import Group


@dataclass
class UpdateGroupDTO:
    id: int
    name: str
    course_id: int
    max_users_count: int
    default_cabinet_id: int | None = None


class UpdateGroup:
    def __init__(
        self,
        group_repository: GroupRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.group_repository = group_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: UpdateGroupDTO) -> Group:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            return await self.group_repository.update(**asdict(data))
