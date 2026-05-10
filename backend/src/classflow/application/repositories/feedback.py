from typing import Protocol


class FeedbackRepository(Protocol):
    async def delete(self, id: int) -> None:
        pass
