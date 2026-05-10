from typing import Annotated

from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter, UploadFile
from fastapi.params import File, Form

from classflow.application.use_cases.subject import (
    CreateSubject,
    CreateSubjectDTO,
    DeleteSubject,
    DeleteSubjectDTO,
    GetAllSubjects,
    UpdateSubject,
    UpdateSubjectDTO,
)
from classflow.presentation.api.common.file import map_file_to_dto
from classflow.presentation.api.routers.subject.models import SubjectResponse

subject_router = APIRouter(
    prefix='/subjects',
    route_class=DishkaRoute,
    tags=['subjects'],
)


@subject_router.post('/', status_code=201)
async def create_subject_router(
    name: Annotated[str, Form()],
    image: Annotated[UploadFile, File()],
    description: Annotated[str, Form()],
    create_subject: FromDishka[CreateSubject],
) -> SubjectResponse:
    dto = CreateSubjectDTO(
        name=name,
        image=map_file_to_dto(image),
        description=description,
    )
    subject = await create_subject(dto)
    return SubjectResponse.model_validate(subject)


@subject_router.get('/')
async def get_all_subjects_router(
    get_all_subjects: FromDishka[GetAllSubjects],
) -> list[SubjectResponse]:
    subjects = await get_all_subjects()
    return [SubjectResponse.model_validate(subject) for subject in subjects]


@subject_router.patch('/{subject_id}/')
async def update_subject_router(
    update_subject: FromDishka[UpdateSubject],
    subject_id: int,
    name: Annotated[str | None, Form()] = None,
    image: Annotated[UploadFile | None, File()] = None,
    description: Annotated[str | None, Form()] = None,
) -> SubjectResponse:
    dto = UpdateSubjectDTO(
        id=subject_id,
        name=name,
        image=map_file_to_dto(image) if image else None,
        description=description,
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
