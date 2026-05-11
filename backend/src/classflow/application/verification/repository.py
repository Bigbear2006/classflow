from typing import Protocol

from classflow.application.verification.data_generator import VerificationData


class VerificationDataRepository(Protocol):
    async def save(self, data: VerificationData, user_id: int) -> None:
        pass

    async def verify(self, data: VerificationData) -> int:
        pass
