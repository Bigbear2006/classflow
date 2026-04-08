from typing import Protocol

from app.domain.entities import Cabinet


class CabinetRepository(Protocol):
    async def create(self, cabinet: Cabinet) -> Cabinet:
        pass

    async def delete(self, id: int) -> None:
        pass
