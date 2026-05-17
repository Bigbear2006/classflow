from dataclasses import asdict, dataclass, replace
from datetime import datetime

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.course_teacher import (
    CourseTeacherRepository,
)
from classflow.application.repositories.group import GroupRepository
from classflow.application.repositories.lesson import LessonRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Lesson
from classflow.domain.exceptions import PermissionDeniedError


@dataclass
class UpdateLessonDTO:
    id: int
    topic: str
    conducted_by_id: int
    start_date: datetime
    end_date: datetime
    cabinet_id: int | None = None
    url: str | None = None
    group_id: int | None = None
    course_teacher_student_id: int | None = None


class UpdateLesson:
    def __init__(
        self,
        lesson_repository: LessonRepository,
        group_repository: GroupRepository,
        course_teacher_repository: CourseTeacherRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.lesson_repository = lesson_repository
        self.group_repository = group_repository
        self.course_teacher_repository = course_teacher_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: UpdateLessonDTO) -> Lesson:
        member = await self.permission_service.ensure_teacher_or_more()

        if member.is_teacher and data.conducted_by_id != member.id:
            raise PermissionDeniedError()

        lesson = await self.lesson_repository.get(data.id)

        if member.is_teacher:
            lesson.ensure_teacher_access(member.id)

            if data.group_id:
                group = await self.group_repository.get_by_id(data.group_id)
                course_teacher_exists = self.course_teacher_repository.exists(
                    group.course_id,
                    member.id,
                )
                if not course_teacher_exists:
                    raise PermissionDeniedError()

            if data.course_teacher_student_id:
                course_teacher = (
                    await self.course_teacher_repository.get_by_student(
                        data.course_teacher_student_id,
                    )
                )
                if (
                    not course_teacher
                    or course_teacher.teacher_id != member.id
                ):
                    raise PermissionDeniedError()

        async with self.uow:
            updated_data = asdict(data)
            updated_data.pop('id')
            updated_lesson = replace(lesson, **updated_data)
            return await self.lesson_repository.update(
                lesson.id,
                topic=updated_lesson.topic,
                conducted_by_id=updated_lesson.conducted_by_id,
                start_date=updated_lesson.start_date,
                end_date=updated_lesson.end_date,
                cabinet_id=updated_lesson.cabinet_id,
                url=updated_lesson.url,
                group_id=updated_lesson.group_id,
                course_teacher_student_id=updated_lesson.course_teacher_student_id,
            )
