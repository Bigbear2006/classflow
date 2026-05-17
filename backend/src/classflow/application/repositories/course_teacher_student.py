from typing import Protocol

from classflow.domain.entities import CourseTeacherStudent
from classflow.domain.enums import StudentStatus


class CourseTeacherStudentRepository(Protocol):
    async def create(
        self,
        course_teacher_student: CourseTeacherStudent,
    ) -> CourseTeacherStudent:
        pass

    async def update(
        self,
        course_teacher_id: int,
        student_id: int,
        *,
        status: StudentStatus,
    ) -> CourseTeacherStudent:
        pass

    async def get(self, id: int) -> CourseTeacherStudent:
        pass

    async def get_all(self) -> list[CourseTeacherStudent]:
        pass

    async def get_with_payments(
        self,
        *,
        teacher_id: int | None = None,
        student_id: int | None = None,
    ) -> list[CourseTeacherStudent]:
        pass
