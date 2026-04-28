from typing import Protocol

from classflow.domain.entities import Feedback


class FeedbackRepository(Protocol):
    async def create(
        self,
        author_id: int,
        rating: int,
        teacher_id: int | None = None,
        course_id: int | None = None,
        text: str = '',
    ) -> Feedback:
        pass

    async def update(
        self,
        id: int,
        *,
        rating: int | None = None,
        text: str | None = None,
    ) -> Feedback:
        pass

    async def delete(self, id: int) -> None:
        pass
