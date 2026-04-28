from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

feedback_router = APIRouter(
    prefix='/feedback',
    route_class=DishkaRoute,
    tags=['feedback'],
)
