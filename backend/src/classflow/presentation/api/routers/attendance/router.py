from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from classflow.application.use_cases.attendance import (
    BulkCreateAttendance,
    BulkCreateAttendanceDTO,
    CreateAttendanceDTO,
)
from classflow.presentation.api.routers.attendance.models import (
    AttendanceResponse,
)

attendance_router = APIRouter(
    prefix='/attendance',
    route_class=DishkaRoute,
    tags=['attendances'],
)


@attendance_router.post('/', status_code=201)
async def bulk_create_attendance_router(
    data: list[CreateAttendanceDTO],
    bulk_create_attendance: FromDishka[BulkCreateAttendance],
) -> list[AttendanceResponse]:
    dto = BulkCreateAttendanceDTO(attendance_list=data)
    attendance_list = await bulk_create_attendance(dto)
    return [
        AttendanceResponse.model_validate(attendance)
        for attendance in attendance_list
    ]
