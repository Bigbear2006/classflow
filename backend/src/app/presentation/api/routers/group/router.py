from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from app.application.use_cases.group.create import CreateGroup, CreateGroupDTO
from app.presentation.api.common.models import IdResponse

group_router = APIRouter(
    prefix='/groups',
    route_class=DishkaRoute,
    tags=['groups'],
)


@group_router.post('/', status_code=201)
async def create_group_router(
    data: CreateGroupDTO,
    create_group: FromDishka[CreateGroup],
) -> IdResponse:
    group = await create_group(data)
    return IdResponse(id=group.id)
