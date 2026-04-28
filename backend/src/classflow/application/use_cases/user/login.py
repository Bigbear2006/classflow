from dataclasses import dataclass

from classflow.application.common.password_hasher import PasswordHasher
from classflow.application.repositories.user import UserRepository
from classflow.domain.entities import User
from classflow.domain.exceptions import InvalidCredentialsError


@dataclass
class LoginUserDTO:
    email: str
    password: str


class LoginUser:
    def __init__(
        self,
        user_repository: UserRepository,
        password_hasher: PasswordHasher,
    ) -> None:
        self.user_repository = user_repository
        self.password_hasher = password_hasher

    async def __call__(self, data: LoginUserDTO) -> User:
        user = await self.user_repository.get_by_email(data.email)
        if not user:
            raise InvalidCredentialsError()

        password_valid = self.password_hasher.verify_password(
            user.password,
            data.password,
        )
        if not password_valid:
            raise InvalidCredentialsError()

        return user
