from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from app.application.use_cases.subject.create import (
    CreateSubject,
    CreateSubjectDTO,
)
from app.application.use_cases.subject.delete import (
    DeleteSubject,
    DeleteSubjectDTO,
)
from app.application.use_cases.subject.get_all import GetAllSubjects
from app.application.use_cases.subject.update import (
    UpdateSubject,
    UpdateSubjectDTO,
)
from app.presentation.api.routers.subject.models import (
    SubjectResponse,
    UpdateSubjectRequest,
)

subject_router = APIRouter(
    prefix='/subjects',
    route_class=DishkaRoute,
    tags=['subjects'],
)


@subject_router.post('/', status_code=201)
async def create_subject_router(
    data: CreateSubjectDTO,
    create_subject: FromDishka[CreateSubject],
) -> SubjectResponse:
    subject = await create_subject(data)
    return SubjectResponse.model_validate(subject)


@subject_router.get('/')
async def get_all_subjects_router(
    get_all_subjects: FromDishka[GetAllSubjects],
) -> list[SubjectResponse]:
    subjects = await get_all_subjects()
    return [SubjectResponse.model_validate(subject) for subject in subjects]


@subject_router.patch('/{subject_id}/')
async def update_subject_router(
    subject_id: int,
    data: UpdateSubjectRequest,
    update_subject: FromDishka[UpdateSubject],
) -> SubjectResponse:
    dto = UpdateSubjectDTO(
        id=subject_id,
        name=data.name,
        image=data.image,
        description=data.description,
    )
    subject = await update_subject(dto)
    return SubjectResponse.model_validate(subject)


@subject_router.delete('/{subject_id}/', status_code=204)
async def delete_subject_router(
    subject_id: int,
    delete_subject: FromDishka[DeleteSubject],
) -> None:
    dto = DeleteSubjectDTO(id=subject_id)
    await delete_subject(dto)
