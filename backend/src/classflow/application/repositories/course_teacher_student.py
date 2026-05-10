from typing import Protocol

from classflow.domain.entities import CourseTeacherStudent


class CourseTeacherStudentRepository(Protocol):
    async def create(
        self,
        course_teacher_student: CourseTeacherStudent,
    ) -> CourseTeacherStudent:
        pass

    async def get_all(self) -> list[CourseTeacherStudent]:
        pass

    async def get_with_payments(self) -> list[CourseTeacherStudent]:
        pass
