from classflow.application.repositories.cabinet import CabinetRepository
from classflow.domain.entities import Cabinet


class GetAllCabinets:
    def __init__(self, cabinet_repository: CabinetRepository) -> None:
        self.cabinet_repository = cabinet_repository

    async def __call__(self) -> list[Cabinet]:
        return await self.cabinet_repository.get_all()
