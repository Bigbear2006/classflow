from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class ErrorResponse(BaseModel):
    code: str
    message: str
    context: dict[str, Any]


class AddressResponse(BaseModel):
    id: int
    address: str
    model_config = ConfigDict(from_attributes=True)


class BaseLessonResponse(BaseModel):
    id: int
    start_date: datetime
    end_date: datetime
    url: str | None = None
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class LessonResponse(BaseLessonResponse):
    conducted_by_id: int
    cabinet_id: int | None = None
    group_id: int | None = None
    course_teacher_student_id: int | None = None


class LessonWithPaymentIdResponse(LessonResponse):
    payment_id: int | None
