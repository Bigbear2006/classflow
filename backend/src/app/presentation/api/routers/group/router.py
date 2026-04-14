from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from app.application.use_cases.group import (
    AddUserToGroup,
    AddUserToGroupDTO,
    CreateGroup,
    CreateGroupDTO,
    GetAllGroups,
    GetGroupById,
    GetGroupByIdDTO,
    GetGroupUsers,
    GetGroupUsersDTO,
    RemoveUserFromGroup,
    RemoveUserFromGroupDTO,
    UpdateGroup,
    UpdateGroupDTO,
)
from app.presentation.api.routers.group.models import (
    DetailGroupResponse,
    GroupResponse,
    UpdateGroupRequest,
)
from app.presentation.api.routers.user.models import UserResponse

group_router = APIRouter(
    prefix='/groups',
    route_class=DishkaRoute,
    tags=['groups'],
)


@group_router.post('/', status_code=201)
async def create_group_router(
    data: CreateGroupDTO,
    create_group: FromDishka[CreateGroup],
) -> GroupResponse:
    group = await create_group(data)
    return GroupResponse.model_validate(group)


@group_router.put('/{group_id}/')
async def update_group_router(
    group_id: int,
    data: UpdateGroupRequest,
    update_group: FromDishka[UpdateGroup],
) -> GroupResponse:
    dto = UpdateGroupDTO(id=group_id, **data.model_dump())
    group = await update_group(dto)
    return GroupResponse.model_validate(group)


@group_router.get('/')
async def get_all_groups_router(
    get_all_groups: FromDishka[GetAllGroups],
) -> list[DetailGroupResponse]:
    groups = await get_all_groups()
    return [DetailGroupResponse.model_validate(group) for group in groups]


@group_router.get('/{group_id}/')
async def get_group_router(
    group_id: int,
    get_group_by_id: FromDishka[GetGroupById],
) -> DetailGroupResponse:
    dto = GetGroupByIdDTO(id=group_id)
    group = await get_group_by_id(dto)
    return DetailGroupResponse.model_validate(group)


@group_router.get('/{group_id}/users/')
async def get_group_users_router(
    group_id: int,
    get_group_users: FromDishka[GetGroupUsers],
) -> list[UserResponse]:
    dto = GetGroupUsersDTO(id=group_id)
    users = await get_group_users(dto)
    return [UserResponse.model_validate(user) for user in users]


@group_router.post('/{group_id}/users/{user_id}/', status_code=204)
async def add_user_to_group_router(
    group_id: int,
    user_id: int,
    add_user_to_group: FromDishka[AddUserToGroup],
) -> None:
    dto = AddUserToGroupDTO(user_id=user_id, group_id=group_id)
    await add_user_to_group(dto)


@group_router.delete('/{group_id}/users/{user_id}/', status_code=204)
async def remove_user_from_group_router(
    group_id: int,
    user_id: int,
    remove_user_from_group: FromDishka[RemoveUserFromGroup],
) -> None:
    dto = RemoveUserFromGroupDTO(user_id=user_id, group_id=group_id)
    await remove_user_from_group(dto)
