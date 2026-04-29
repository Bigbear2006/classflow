from typing import Annotated

from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter, Response
from fastapi.params import Cookie, Depends

from classflow.application.use_cases.user import (
    ChangeUserPassword,
    ChangeUserPasswordDTO,
    GetCurrentUser,
    LoginUser,
    LoginUserDTO,
    RegisterUser,
    RegisterUserDTO,
    UpdateCurrentUser,
    UpdateCurrentUserDTO,
)
from classflow.infrastructure.auth.token_processor import (
    JWTTokenProcessor,
    TokenType,
)
from classflow.presentation.api.common.cookie import (
    cookie_scheme,
    set_access_cookie,
    set_refresh_cookie,
)
from classflow.presentation.api.routers.user.models import UserResponse

user_router = APIRouter(
    prefix='/users',
    route_class=DishkaRoute,
    tags=['users'],
)


@user_router.post('/', status_code=201)
async def register_user_router(
    data: RegisterUserDTO,
    register_user: FromDishka[RegisterUser],
) -> UserResponse:
    user = await register_user(data)
    return UserResponse.model_validate(user)


@user_router.post('/login/', status_code=204)
async def login_user_router(
    data: LoginUserDTO,
    login_user: FromDishka[LoginUser],
    token_processor: FromDishka[JWTTokenProcessor],
    response: Response,
) -> None:
    user = await login_user(data)
    token_pair = token_processor.create_token_pair(user.id)
    set_access_cookie(response, token_pair.access)
    set_refresh_cookie(response, token_pair.refresh)


@user_router.post('/refresh-token/', status_code=204)
async def refresh_token_router(
    refresh: Annotated[str, Cookie()],
    token_processor: FromDishka[JWTTokenProcessor],
    response: Response,
) -> None:
    user_id = token_processor.extract_user_id(
        refresh,
        token_type=TokenType.REFRESH,
    )
    access = token_processor.create_access_token(user_id)
    set_access_cookie(response, access)


@user_router.post('/logout/', status_code=204)
async def logout_user_router(response: Response) -> None:
    response.delete_cookie('access')
    response.delete_cookie('refresh')


@user_router.get('/me/', dependencies=[Depends(cookie_scheme)])
async def get_me_router(
    get_current_user: FromDishka[GetCurrentUser],
) -> UserResponse:
    user = await get_current_user()
    return UserResponse.model_validate(user)


@user_router.patch('/me/', dependencies=[Depends(cookie_scheme)])
async def update_me_router(
    data: UpdateCurrentUserDTO,
    update_user: FromDishka[UpdateCurrentUser],
) -> UserResponse:
    user = await update_user(data)
    return UserResponse.model_validate(user)


@user_router.patch(
    '/me/change-password/',
    status_code=204,
    dependencies=[Depends(cookie_scheme)],
)
async def change_my_password_router(
    data: ChangeUserPasswordDTO,
    change_password: FromDishka[ChangeUserPassword],
) -> None:
    await change_password(data)
