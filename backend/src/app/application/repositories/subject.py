from typing import Protocol

from app.domain.entities import Subject


class SubjectRepository(Protocol):
    async def create(self, subject: Subject) -> Subject:
        pass

    async def update(
        self,
        id: int,
        *,
        name: str | None = None,
        image: str | None = None,
        description: str | None = None,
    ) -> Subject:
        pass

    async def get_all(self) -> list[Subject]:
        pass

    async def delete(self, id: int) -> None:
        pass
