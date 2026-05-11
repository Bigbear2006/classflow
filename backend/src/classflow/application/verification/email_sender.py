from typing import Protocol


class EmailSender(Protocol):
    async def send_code(self, code: str, to: str) -> None:
        pass
