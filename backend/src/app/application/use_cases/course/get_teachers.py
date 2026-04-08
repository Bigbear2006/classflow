from dataclasses import dataclass

from app.application.repositories.course import CourseRepository
from app.domain.entities import User


@dataclass
class GetCourseTeachersDTO:
    course_id: int


class GetCourseTeachers:
    def __init__(self, course_repository: CourseRepository) -> None:
        self.course_repository = course_repository

    async def __call__(self, data: GetCourseTeachersDTO) -> list[User]:
        return await self.course_repository.get_teachers(data.course_id)
