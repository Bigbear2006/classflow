from app.application.repositories.course import CourseRepository
from app.domain.entities import Course


class GetAllCourses:
    def __init__(self, course_repository: CourseRepository) -> None:
        self.course_repository = course_repository

    async def __call__(self) -> list[Course]:
        return await self.course_repository.get_all()
