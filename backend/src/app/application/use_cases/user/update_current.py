from dataclasses import dataclass

from app.application.common.id_provider import IdentityProvider
from app.application.common.uow import UnitOfWork
from app.application.repositories.user import UserRepository
from app.domain.entities import User


@dataclass
class UpdateCurrentUserDTO:
    fullname: str | None = None
    phone: str | None = None


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
            return await self.user_repository.update(
                current_user.id,
                fullname=data.fullname,
                phone=data.phone,
            )
