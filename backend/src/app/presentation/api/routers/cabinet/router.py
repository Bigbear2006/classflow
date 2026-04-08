from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from app.application.use_cases.cabinet.create import (
    CreateCabinet,
    CreateCabinetDTO,
)
from app.application.use_cases.cabinet.delete import (
    DeleteCabinet,
    DeleteCabinetDTO,
)
from app.presentation.api.common.models import IdResponse

cabinet_router = APIRouter(
    prefix='/cabinets',
    route_class=DishkaRoute,
    tags=['cabinets'],
)


@cabinet_router.post('/', status_code=201)
async def create_cabinet_router(
    data: CreateCabinetDTO,
    create_cabinet: FromDishka[CreateCabinet],
) -> IdResponse:
    cabinet = await create_cabinet(data)
    return IdResponse(id=cabinet.id)


@cabinet_router.delete('/{cabinet_id}/', status_code=204)
async def delete_cabinet_router(
    cabinet_id: int,
    delete_cabinet: FromDishka[DeleteCabinet],
) -> None:
    dto = DeleteCabinetDTO(id=cabinet_id)
    await delete_cabinet(dto)
