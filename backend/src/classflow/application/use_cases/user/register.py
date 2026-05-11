from dataclasses import dataclass

from classflow.application.common.password_hasher import PasswordHasher
from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.user import UserRepository
from classflow.application.verification.data_generator import (
    VerificationData,
    VerificationDataGenerator,
)
from classflow.application.verification.email_sender import EmailSender
from classflow.application.verification.repository import (
    VerificationDataRepository,
)
from classflow.domain.entities import User
from classflow.domain.exceptions import AlreadyExistsError


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

    async def __call__(self, data: RegisterUserDTO) -> VerificationData:
        async with self.uow:
            password = self.password_hasher.hash_password(data.password)
            user = User(
                fullname=data.fullname,
                email=data.email,
                phone=data.phone,
                password=password,
            )

            try:
                user = await self.user_repository.create(user)
            except AlreadyExistsError:
                await self.uow.rollback()
                user = await self.user_repository.get_by_email(data.email)
                if user.is_active:
                    raise

                user = await self.user_repository.update(
                    user.id,
                    fullname=data.fullname,
                    phone=data.phone,
                    password=password,
                )

        data = self.verification_data_generator.generate_data()
        await self.verification_data_repository.save(data, user_id=user.id)
        await self.email_sender.send_code(data.code, to=user.email)
        return data
