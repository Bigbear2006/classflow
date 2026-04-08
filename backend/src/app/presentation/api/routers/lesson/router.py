from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from app.application.use_cases.lesson.create import (
    CreateLesson,
    CreateLessonDTO,
)
from app.presentation.api.common.models import IdResponse

lesson_router = APIRouter(
    prefix='/lessons',
    route_class=DishkaRoute,
    tags=['lessons'],
)


@lesson_router.post('/', status_code=201)
async def create_lesson_router(
    data: CreateLessonDTO,
    create_lesson: FromDishka[CreateLesson],
) -> IdResponse:
    lesson = await create_lesson(data)
    return IdResponse(id=lesson.id)
