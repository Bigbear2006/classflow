from datetime import date, datetime
from typing import Protocol

from classflow.domain.entities import Lesson


class LessonRepository(Protocol):
    async def create(self, lesson: Lesson) -> Lesson:
        pass

    async def update(
        self,
        id: int,
        *,
        conducted_by_id: int,
        start_date: datetime,
        end_date: datetime,
        cabinet_id: int | None = None,
        url: str | None = None,
        group_id: int | None = None,
        course_teacher_student_id: int | None = None,
    ) -> Lesson:
        pass

    async def get_all(
        self,
        *,
        start_date: date | None = None,
        end_date: date | None = None,
    ) -> list[Lesson]:
        pass

    async def get_student_lessons(self, user_id: int) -> list[Lesson]:
        pass

    async def get_teacher_lessons(self, user_id: int) -> list[Lesson]:
        pass

    async def delete(self, id: int) -> None:
        pass
