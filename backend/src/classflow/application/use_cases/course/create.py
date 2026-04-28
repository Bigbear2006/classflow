from dataclasses import asdict, dataclass
from datetime import timedelta

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.course import CourseRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Course
from classflow.domain.enums import CoursePaymentType, CourseType, LessonType


@dataclass
class CreateCourseDTO:
    subject_id: int
    type: CourseType
    price: int
    payment_type: CoursePaymentType
    lesson_type: LessonType
    lesson_duration: timedelta
    lessons_count: int | None = None
    duration: timedelta | None = None


class CreateCourse:
    def __init__(
        self,
        course_repository: CourseRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.course_repository = course_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: CreateCourseDTO) -> Course:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            course = Course(**asdict(data))
            return await self.course_repository.create(course)
