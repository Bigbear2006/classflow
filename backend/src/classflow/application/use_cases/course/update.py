from dataclasses import asdict, dataclass
from datetime import timedelta

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.course import CourseRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Course
from classflow.domain.enums import CoursePaymentType, CourseType, LessonType


@dataclass
class UpdateCourseDTO:
    id: int
    subject_id: int
    type: CourseType
    price: int
    payment_type: CoursePaymentType
    lesson_type: LessonType
    lesson_duration: int
    lessons_count: int | None = None
    duration: timedelta | None = None


class UpdateCourse:
    def __init__(
        self,
        course_repository: CourseRepository,
        uow: UnitOfWork,
        permission_service: PermissionService,
    ) -> None:
        self.course_repository = course_repository
        self.uow = uow
        self.permission_service = permission_service

    async def __call__(self, data: UpdateCourseDTO) -> Course:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            return await self.course_repository.update(**asdict(data))
