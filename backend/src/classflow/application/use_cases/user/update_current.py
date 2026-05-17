from dataclasses import asdict, dataclass, replace

from classflow.application.common.id_provider import IdentityProvider
from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.user import UserRepository
from classflow.domain.entities import User


@dataclass
class UpdateCurrentUserDTO:
    fullname: str
    phone: str


class UpdateCurrentUser:
    def __init__(
        self,
        user_repository: UserRepository,
        uow: UnitOfWork,
        id_provider: IdentityProvider,
    ) -> None:
        self.user_repository = user_repository
        self.uow = uow
        self.id_provider = id_provider

    async def __call__(self, data: UpdateCurrentUserDTO) -> User:
        current_user = await self.id_provider.get_current_user()
        async with self.uow:
            updated_user = replace(current_user, **asdict(data))
            return await self.user_repository.update(
                current_user.id,
                fullname=updated_user.fullname,
                phone=updated_user.phone,
            )
