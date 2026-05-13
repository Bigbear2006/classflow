from typing import Protocol

from classflow.application.verification.data_generator import VerificationData


class VerificationDataRepository(Protocol):
    async def save(self, data: VerificationData, user_id: int) -> None:
        pass

    async def change_code(self, token: str, code: str) -> None:
        pass

    async def verify(self, data: VerificationData) -> int:
        pass

    async def resend_available(self, token: str) -> bool:
        pass

    async def get_user_id(self, token: str) -> int:
        pass
