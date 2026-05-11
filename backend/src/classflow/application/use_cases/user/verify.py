from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.user import UserRepository
from classflow.application.verification.data_generator import VerificationData
from classflow.application.verification.repository import (
    VerificationDataRepository,
)


@dataclass
class VerifyUserEmailDTO:
    verification_data: VerificationData


class VerifyUserEmail:
    def __init__(
        self,
        user_repository: UserRepository,
        verification_data_repository: VerificationDataRepository,
        uow: UnitOfWork,
    ) -> None:
        self.user_repository = user_repository
        self.verification_data_repository = verification_data_repository
        self.uow = uow

    async def __call__(self, data: VerifyUserEmailDTO) -> None:
        user_id = await self.verification_data_repository.verify(
            data.verification_data,
        )
        async with self.uow:
            await self.user_repository.update(user_id, is_active=True)
