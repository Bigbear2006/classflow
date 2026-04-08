from typing import Protocol

from app.domain.entities import CourseTeacherStudent


class CourseTeacherStudentRepository(Protocol):
    async def create(
        self,
        course_teacher_student: CourseTeacherStudent,
    ) -> CourseTeacherStudent:
        pass
