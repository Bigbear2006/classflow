from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

attendance_router = APIRouter(
    prefix='/attendances',
    route_class=DishkaRoute,
    tags=['attendances'],
)
