from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from classflow.application.use_cases.attendance import (
    BulkCreateAttendance,
    BulkCreateAttendanceDTO,
    GetAttendanceStats,
    GetCoursesAttendanceStats,
    GetStudentAttendance,
)
from classflow.domain.entities import AttendanceStats
from classflow.presentation.api.routers.attendance.models import (
    AttendanceDetailResponse,
    AttendanceResponse,
    CourseAttendanceStatsResponse,
)

attendance_router = APIRouter(
    prefix='/attendance',
    route_class=DishkaRoute,
    tags=['attendance'],
)


@attendance_router.post('/', status_code=201)
async def bulk_create_attendance_router(
    data: list[BulkCreateAttendanceDTO],
    bulk_create_attendance: FromDishka[BulkCreateAttendance],
) -> list[AttendanceResponse]:
    attendance_list = await bulk_create_attendance(data)
    return [
        AttendanceResponse.model_validate(attendance)
        for attendance in attendance_list
    ]


@attendance_router.get('/my/')
async def get_student_attendance_router(
    get_student_attendance: FromDishka[GetStudentAttendance],
) -> list[AttendanceDetailResponse]:
    attendance_list = await get_student_attendance()
    return [
        AttendanceDetailResponse.model_validate(attendance)
        for attendance in attendance_list
    ]


@attendance_router.get('/stats/')
async def get_attendance_stats_router(
    get_stats: FromDishka[GetAttendanceStats],
) -> AttendanceStats:
    return await get_stats()


@attendance_router.get('/stats/courses/')
async def get_my_attendance_stats_router(
    get_stats: FromDishka[GetCoursesAttendanceStats],
) -> list[CourseAttendanceStatsResponse]:
    stats = await get_stats()
    return [
        CourseAttendanceStatsResponse.model_validate(stat) for stat in stats
    ]
