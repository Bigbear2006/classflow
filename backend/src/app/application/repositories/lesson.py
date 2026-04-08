from datetime import date, datetime
from typing import Protocol

from app.domain.entities import Lesson


class LessonRepository(Protocol):
    async def create(
        self,
        cabinet_id: int,
        conducted_by_id: int,
        start_date: datetime,
        end_date: datetime,
        group_id: int | None = None,
        student_teacher_course_id: int | None = None,
    ) -> Lesson:
        pass

    async def get_by_date_range(
        self,
        start_date: date,
        end_date: date,
    ) -> list[Lesson]:
        pass

    async def get_student_lessons(self, user_id: int) -> list[Lesson]:
        pass

    async def get_teacher_lessons(self, user_id: int) -> list[Lesson]:
        pass
