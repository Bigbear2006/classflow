from dataclasses import dataclass

from classflow.application.repositories.user import UserRepository
from classflow.application.verification.data_generator import (
    VerificationDataGenerator,
)
from classflow.application.verification.email_sender import EmailSender
from classflow.application.verification.repository import (
    VerificationDataRepository,
)
from classflow.domain.exceptions import TooManyAttemptsError


@dataclass
class ResendVerificationCodeDTO:
    token: str


class ResendVerificationCode:
    def __init__(
        self,
        user_repository: UserRepository,
        verification_data_generator: VerificationDataGenerator,
        verification_data_repository: VerificationDataRepository,
        email_sender: EmailSender,
    ) -> None:
        self.user_repository = user_repository
        self.verification_data_generator = verification_data_generator
        self.verification_data_repository = verification_data_repository
        self.email_sender = email_sender

    async def __call__(self, data: ResendVerificationCodeDTO) -> None:
        if not await self.verification_data_repository.resend_available(
            data.token,
        ):
            raise TooManyAttemptsError()

        user_id = await self.verification_data_repository.get_user_id(
            data.token,
        )
        user = await self.user_repository.get_by_id(user_id)

        code = self.verification_data_generator.generate_data().code
        await self.verification_data_repository.change_code(data.token, code)
        await self.email_sender.send_code(code, to=user.email)
