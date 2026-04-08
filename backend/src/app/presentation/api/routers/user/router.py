from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter, Response
from fastapi.params import Depends
from fastapi.security import HTTPBearer

from app.application.use_cases.user.change_password import (
    ChangeUserPassword,
    ChangeUserPasswordDTO,
)
from app.application.use_cases.user.get_current import GetCurrentUser
from app.application.use_cases.user.login import LoginUser, LoginUserDTO
from app.application.use_cases.user.register import (
    RegisterUser,
    RegisterUserDTO,
)
from app.application.use_cases.user.update_current import (
    UpdateCurrentUser,
    UpdateCurrentUserDTO,
)
from app.infrastructure.auth.token_processor import JWTTokenProcessor
from app.presentation.api.routers.user.models import (
    LoginUserResponse,
    UserResponse,
)

user_router = APIRouter(
    prefix='/users',
    route_class=DishkaRoute,
    tags=['users'],
)
security = HTTPBearer()


@user_router.post('/', status_code=201)
async def register_user_router(
    data: RegisterUserDTO,
    register_user: FromDishka[RegisterUser],
) -> UserResponse:
    user = await register_user(data)
    return UserResponse.model_validate(user)


@user_router.post('/login/')
async def login_user_router(
    data: LoginUserDTO,
    login_user: FromDishka[LoginUser],
    token_processor: FromDishka[JWTTokenProcessor],
) -> LoginUserResponse:
    user = await login_user(data)
    token = token_processor.create_token(user.id)
    return LoginUserResponse(access_token=token)


@user_router.get('/me/', dependencies=[Depends(security)])
async def get_me_router(
    get_current_user: FromDishka[GetCurrentUser],
) -> UserResponse:
    user = await get_current_user()
    return UserResponse.model_validate(user)


@user_router.patch('/me/', dependencies=[Depends(security)])
async def update_me_router(
    data: UpdateCurrentUserDTO,
    update_user: FromDishka[UpdateCurrentUser],
) -> UserResponse:
    user = await update_user(data)
    return UserResponse.model_validate(user)


@user_router.patch(
    '/me/change-password/',
    status_code=204,
    dependencies=[Depends(security)],
)
async def change_my_password_router(
    data: ChangeUserPasswordDTO,
    change_password: FromDishka[ChangeUserPassword],
) -> None:
    await change_password(data)
