from dataclasses import asdict, dataclass

from app.application.common.uow import UnitOfWork
from app.application.repositories.group import GroupRepository
from app.domain.entities import Group


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
        uow: UnitOfWork,
    ) -> None:
        self.group_repository = group_repository
        self.uow = uow

    async def __call__(self, data: CreateGroupDTO) -> Group:
        async with self.uow:
            return await self.group_repository.create(**asdict(data))
