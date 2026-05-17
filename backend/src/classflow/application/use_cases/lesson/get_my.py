from classflow.application.repositories.lesson import LessonRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Lesson
from classflow.domain.exceptions import PermissionDeniedError


# Deprecated
class GetMyLessons:
    def __init__(
        self,
        lesson_repository: LessonRepository,
        permission_service: PermissionService,
    ):
        self.lesson_repository = lesson_repository
        self.permission_service = permission_service

    async def __call__(self) -> list[Lesson]:
        member = await self.permission_service.get_current_member()
        if member.is_student:
            return await self.lesson_repository.get_student_lessons(member.id)
        elif member.is_teacher:
            return await self.lesson_repository.get_teacher_lessons(member.id)
        else:
            raise PermissionDeniedError()
