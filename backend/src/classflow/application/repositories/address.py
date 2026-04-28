from typing import Protocol

from classflow.domain.entities import Address


class AddressRepository(Protocol):
    async def create(self, address: Address) -> Address:
        pass

    async def update(self, id: int, address: str) -> Address:
        pass

    async def get_all(self) -> list[Address]:
        pass

    async def delete(self, id: int) -> None:
        pass
