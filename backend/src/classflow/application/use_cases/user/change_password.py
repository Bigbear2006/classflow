from dataclasses import dataclass

from classflow.application.common.id_provider import IdentityProvider
from classflow.application.common.password_hasher import PasswordHasher
from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.user import UserRepository
from classflow.domain.exceptions import InvalidCredentialsError


@dataclass
class ChangeUserPasswordDTO:
    old_password: str
    new_password: str


class ChangeUserPassword:
    def __init__(
        self,
        user_repository: UserRepository,
        id_provider: IdentityProvider,
        password_hasher: PasswordHasher,
        uow: UnitOfWork,
    ) -> None:
        self.user_repository = user_repository
        self.id_provider = id_provider
        self.password_hasher = password_hasher
        self.uow = uow

    async def __call__(self, data: ChangeUserPasswordDTO) -> None:
        current_user = await self.id_provider.get_current_user()
        if not self.password_hasher.verify_password(
            current_user.password,
            data.old_password,
        ):
            raise InvalidCredentialsError()

        new_password = self.password_hasher.hash_password(data.new_password)
        async with self.uow:
            await self.user_repository.update(
                current_user.id,
                password=new_password,
            )
