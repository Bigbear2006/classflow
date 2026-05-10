from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from classflow.application.use_cases.group import (
    AddCurrentStudentToGroup,
    AddCurrentStudentToGroupDTO,
    AddStudentToGroup,
    AddStudentToGroupDTO,
    CreateGroup,
    CreateGroupDTO,
    GetAllGroups,
    GetGroupById,
    GetGroupByIdDTO,
    GetGroupsWithPayments,
    GetGroupsWithStudents,
    GetGroupUsers,
    GetGroupUsersDTO,
    RemoveUserFromGroup,
    RemoveUserFromGroupDTO,
    UpdateGroup,
    UpdateGroupDTO,
    UpdateStudentGroup,
    UpdateStudentGroupDTO,
)
from classflow.presentation.api.routers.group.models import (
    GroupDetailResponse,
    GroupResponse,
    GroupWithPaymentsResponse,
    GroupWithStudentsResponse,
    UpdateGroupRequest,
    UpdateStudentGroupRequest,
)
from classflow.presentation.api.routers.user.models import UserResponse

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
) -> list[GroupDetailResponse]:
    groups = await get_all_groups()
    return [GroupDetailResponse.model_validate(group) for group in groups]


@group_router.get('/payments/')
async def get_groups_with_payments_router(
    get_groups_with_payments: FromDishka[GetGroupsWithPayments],
):
    groups = await get_groups_with_payments()
    return [
        GroupWithPaymentsResponse.model_validate(group) for group in groups
    ]


@group_router.get('/students/')
async def get_groups_with_students_router(
    get_groups_with_students: FromDishka[GetGroupsWithStudents],
) -> list[GroupWithStudentsResponse]:
    groups = await get_groups_with_students()
    return [
        GroupWithStudentsResponse.model_validate(group) for group in groups
    ]


@group_router.get('/{group_id}/')
async def get_group_router(
    group_id: int,
    get_group_by_id: FromDishka[GetGroupById],
) -> GroupDetailResponse:
    dto = GetGroupByIdDTO(id=group_id)
    group = await get_group_by_id(dto)
    return GroupDetailResponse.model_validate(group)


@group_router.get('/{group_id}/students/')
async def get_group_students_router(
    group_id: int,
    get_group_users: FromDishka[GetGroupUsers],
) -> list[UserResponse]:
    dto = GetGroupUsersDTO(id=group_id)
    users = await get_group_users(dto)
    return [UserResponse.model_validate(user) for user in users]


@group_router.post('/{group_id}/students/me/', status_code=204)
async def add_current_student_to_group_router(
    group_id: int,
    add_current_student_to_group: FromDishka[AddCurrentStudentToGroup],
) -> None:
    dto = AddCurrentStudentToGroupDTO(group_id=group_id)
    await add_current_student_to_group(dto)


@group_router.post('/{group_id}/students/{student_id}/', status_code=204)
async def add_student_to_group_router(
    group_id: int,
    student_id: int,
    add_student_to_group: FromDishka[AddStudentToGroup],
) -> None:
    dto = AddStudentToGroupDTO(student_id=student_id, group_id=group_id)
    await add_student_to_group(dto)


@group_router.patch('/{group_id}/students/{student_id}/', status_code=204)
async def update_student_group_router(
    data: UpdateStudentGroupRequest,
    group_id: int,
    student_id: int,
    update_student_group: FromDishka[UpdateStudentGroup],
) -> None:
    dto = UpdateStudentGroupDTO(
        student_id=student_id,
        group_id=group_id,
        status=data.status,
    )
    await update_student_group(dto)


@group_router.delete('/{group_id}/students/{student_id}/', status_code=204)
async def remove_student_from_group_router(
    group_id: int,
    student_id: int,
    remove_user_from_group: FromDishka[RemoveUserFromGroup],
) -> None:
    dto = RemoveUserFromGroupDTO(student_id=student_id, group_id=group_id)
    await remove_user_from_group(dto)
