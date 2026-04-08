from app.application.repositories.address import AddressRepository
from app.domain.entities import Address


class GetAllAddresses:
    def __init__(self, address_repository: AddressRepository) -> None:
        self.address_repository = address_repository

    async def __call__(self) -> list[Address]:
        return await self.address_repository.get_all()
