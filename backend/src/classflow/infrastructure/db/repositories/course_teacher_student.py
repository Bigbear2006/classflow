from sqlalchemy.ext.asyncio import AsyncSession

from classflow.application.repositories.course_teacher_student import (
    CourseTeacherStudentRepository,
)
from classflow.domain.entities import CourseTeacherStudent
from classflow.infrastructure.db.repositories.base import create


class CourseTeacherStudentRepositoryImpl(CourseTeacherStudentRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(
        self,
        course_teacher_student: CourseTeacherStudent,
    ) -> CourseTeacherStudent:
        return await create(self.session, course_teacher_student)
