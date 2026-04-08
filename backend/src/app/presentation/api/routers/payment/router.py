from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

payment_router = APIRouter(
    prefix='/payments',
    route_class=DishkaRoute,
    tags=['payments'],
)
