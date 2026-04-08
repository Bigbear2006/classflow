from dataclasses import dataclass

from app.application.common.uow import UnitOfWork
from app.application.repositories.group import GroupRepository


@dataclass
class AddUserToGroupDTO:
    user_id: int
    group_id: int


class AddUserToGroup:
    def __init__(
        self,
        group_repository: GroupRepository,
        uow: UnitOfWork,
    ) -> None:
        self.group_repository = group_repository
        self.uow = uow

    async def __call__(self, data: AddUserToGroupDTO) -> None:
        async with self.uow:
            await self.group_repository.add_user(data.group_id, data.user_id)
