from dataclasses import dataclass

from classflow.application.common.password_hasher import PasswordHasher
from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.user import UserRepository
from classflow.application.verification.data_generator import (
    VerificationDataGenerator,
)
from classflow.application.verification.email_sender import EmailSender
from classflow.application.verification.repository import (
    VerificationDataRepository,
)
from classflow.domain.entities import User


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
        password_hasher: PasswordHasher,
        verification_data_generator: VerificationDataGenerator,
        verification_data_repository: VerificationDataRepository,
        email_sender: EmailSender,
        uow: UnitOfWork,
    ) -> None:
        self.user_repository = user_repository
        self.password_hasher = password_hasher
        self.verification_data_generator = verification_data_generator
        self.verification_data_repository = verification_data_repository
        self.email_sender = email_sender
        self.uow = uow

    async def __call__(self, data: RegisterUserDTO) -> str:
        async with self.uow:
            password = self.password_hasher.hash_password(data.password)
            user = User(
                fullname=data.fullname,
                email=data.email,
                phone=data.phone,
                password=password,
            )
            user = await self.user_repository.create(user)

        verification_data = self.verification_data_generator.generate_data()
        await self.verification_data_repository.save(
            verification_data,
            user_id=user.id,
        )
        await self.email_sender.send_code(
            verification_data.code,
            to=user.email,
        )
        return verification_data.token
