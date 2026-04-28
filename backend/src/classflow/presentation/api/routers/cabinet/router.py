from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from classflow.application.use_cases.cabinet import (
    CreateCabinet,
    CreateCabinetDTO,
    DeleteCabinet,
    DeleteCabinetDTO,
    GetAllCabinets,
)
from classflow.presentation.api.routers.cabinet.models import (
    CabinetResponse,
    DetailCabinetResponse,
)

cabinet_router = APIRouter(
    prefix='/cabinets',
    route_class=DishkaRoute,
    tags=['cabinets'],
)


@cabinet_router.post('/', status_code=201)
async def create_cabinet_router(
    data: CreateCabinetDTO,
    create_cabinet: FromDishka[CreateCabinet],
) -> CabinetResponse:
    cabinet = await create_cabinet(data)
    return CabinetResponse.model_validate(cabinet)


@cabinet_router.get('/')
async def get_all_cabinets_router(
    get_all_cabinets: FromDishka[GetAllCabinets],
) -> list[CabinetResponse]:
    cabinets = await get_all_cabinets()
    return [
        DetailCabinetResponse.model_validate(cabinet) for cabinet in cabinets
    ]


@cabinet_router.delete('/{cabinet_id}/', status_code=204)
async def delete_cabinet_router(
    cabinet_id: int,
    delete_cabinet: FromDishka[DeleteCabinet],
) -> None:
    dto = DeleteCabinetDTO(id=cabinet_id)
    await delete_cabinet(dto)
