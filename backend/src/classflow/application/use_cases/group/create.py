from dataclasses import asdict, dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.group import GroupRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Group


@dataclass
class CreateGroupDTO:
    name: str
    course_id: int
    max_users_count: int
    default_cabinet_id: int | None = None


class CreateGroup:
    def __init__(
        self,
        group_repository: GroupRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.group_repository = group_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: CreateGroupDTO) -> Group:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            group = Group(**asdict(data))
            return await self.group_repository.create(group)
