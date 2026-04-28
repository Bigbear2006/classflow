from datetime import date

from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from classflow.application.use_cases.lesson import (
    CreateLesson,
    CreateLessonDTO,
    DeleteLesson,
    DeleteLessonDTO,
    GetAllLessons,
    GetAllLessonsDTO,
    GetMyLessons,
    UpdateLesson,
    UpdateLessonDto,
)
from classflow.presentation.api.routers.lesson.models import (
    DetailLessonResponse,
    LessonResponse,
    UpdateLessonRequest,
)

lesson_router = APIRouter(
    prefix='/lessons',
    route_class=DishkaRoute,
    tags=['lessons'],
)


@lesson_router.post('/', status_code=201)
async def create_lesson_router(
    data: CreateLessonDTO,
    create_lesson: FromDishka[CreateLesson],
) -> LessonResponse:
    lesson = await create_lesson(data)
    return LessonResponse.model_validate(lesson)


@lesson_router.put('/{lesson_id}/')
async def update_lesson_router(
    lesson_id: int,
    data: UpdateLessonRequest,
    update_lesson: FromDishka[UpdateLesson],
) -> LessonResponse:
    dto = UpdateLessonDto(id=lesson_id, **data.model_dump())
    lesson = await update_lesson(dto)
    return LessonResponse.model_validate(lesson)


@lesson_router.get('/')
async def get_all_lessons_router(
    get_all_lessons: FromDishka[GetAllLessons],
    start_date: date | None = None,
    end_date: date | None = None,
) -> list[DetailLessonResponse]:
    dto = GetAllLessonsDTO(start_date, end_date)
    lessons = await get_all_lessons(dto)
    return [DetailLessonResponse.model_validate(lesson) for lesson in lessons]


@lesson_router.get('/my/')
async def get_my_lessons_router(
    get_my_lessons: FromDishka[GetMyLessons],
) -> list[DetailLessonResponse]:
    lessons = await get_my_lessons()
    return [DetailLessonResponse.model_validate(lesson) for lesson in lessons]


@lesson_router.delete('/{lesson_id}/')
async def delete_lesson_router(
    lesson_id: int,
    delete_lesson: FromDishka[DeleteLesson],
) -> None:
    dto = DeleteLessonDTO(id=lesson_id)
    await delete_lesson(dto)
