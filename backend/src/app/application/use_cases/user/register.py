from dataclasses import dataclass

from app.application.common.password_hasher import PasswordHasher
from app.application.common.uow import UnitOfWork
from app.application.repositories.user import UserRepository
from app.domain.entities import User


@dataclass
class RegisterUserDTO:
    fullname: str
    email: str
    phone: str
    password: str


class RegisterUser:
    def __init__(
        self,
        user_repository: UserRepository,
        uow: UnitOfWork,
        password_hasher: PasswordHasher,
    ) -> None:
        self.user_repository = user_repository
        self.uow = uow
        self.password_hasher = password_hasher

    async def __call__(self, data: RegisterUserDTO) -> User:
        async with self.uow:
            password = self.password_hasher.hash_password(data.password)
            user = User(
                fullname=data.fullname,
                email=data.email,
                phone=data.phone,
                password=password,
            )
            return await self.user_repository.create(user)
