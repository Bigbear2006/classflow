from pydantic import BaseModel, ConfigDict

from classflow.domain.enums import AttendanceStatus


class AttendanceResponse(BaseModel):
    id: int
    lesson_id: int
    student_id: int
    status: AttendanceStatus
    model_config = ConfigDict(from_attributes=True)
