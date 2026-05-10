from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from classflow.presentation.api.routers.feedback.models import (
    TeacherWithFeedbackResponse,
)

feedback_router = APIRouter(
    prefix='/feedback',
    route_class=DishkaRoute,
    tags=['feedback'],
)


@feedback_router.get('/teachers/')
async def get_teachers_with_feedback_router() -> list[
    TeacherWithFeedbackResponse
]:
    pass
