from fastapi import APIRouter

from app.presentation.api.routers.address.router import address_router
from app.presentation.api.routers.attendance.router import attendance_router
from app.presentation.api.routers.cabinet import cabinet_router
from app.presentation.api.routers.course.router import course_router
from app.presentation.api.routers.feedback.router import feedback_router
from app.presentation.api.routers.group import group_router
from app.presentation.api.routers.lesson import lesson_router
from app.presentation.api.routers.organization import organization_router
from app.presentation.api.routers.payment.router import payment_router
from app.presentation.api.routers.subject.router import subject_router
from app.presentation.api.routers.user import user_router

root_router = APIRouter(prefix='/api/v1')

routers = [
    user_router,
    organization_router,
    address_router,
    cabinet_router,
    subject_router,
    course_router,
    group_router,
    lesson_router,
    attendance_router,
    payment_router,
    feedback_router,
]
for router in routers:
    root_router.include_router(router)
