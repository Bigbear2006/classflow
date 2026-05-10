from datetime import datetime

from pydantic import BaseModel, ConfigDict


class BasePaymentResponse(BaseModel):
    id: int
    amount: int
    created_by_id: int
    date: datetime
    comment: str
    model_config = ConfigDict(from_attributes=True)


class PaymentResponse(BasePaymentResponse):
    student_group_id: int | None = None
    course_teacher_student_id: int | None = None
    lesson_id: int | None = None
