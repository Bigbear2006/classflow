from dataclasses import asdict, dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.attendance import AttendanceRepository
from classflow.application.repositories.course_teacher_student import (
    CourseTeacherStudentRepository,
)
from classflow.application.repositories.lesson import LessonRepository
from classflow.application.repositories.student_group import (
    StudentGroupRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Attendance
from classflow.domain.enums import AttendanceStatus
from classflow.domain.exceptions import (
    InvalidAttendanceList,
    TooManyAttendanceStudents,
)


@dataclass
class CreateAttendanceDTO:
    student_id: int
    status: AttendanceStatus


@dataclass
class BulkCreateAttendanceDTO:
    attendance_list: list[CreateAttendanceDTO]
    lesson_id: int


class BulkCreateAttendance:
    def __init__(
        self,
        attendance_repository: AttendanceRepository,
        lesson_repository: LessonRepository,
        student_group_repository: StudentGroupRepository,
        course_teacher_student_repository: CourseTeacherStudentRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.attendance_repository = attendance_repository
        self.lesson_repository = lesson_repository
        self.student_group_repository = student_group_repository
        self.course_teacher_student_repository = (
            course_teacher_student_repository
        )
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(
        self,
        data: BulkCreateAttendanceDTO,
    ) -> list[Attendance]:
        member = await self.permission_service.ensure_teacher_or_more()

        if not data.attendance_list:
            return []

        lesson = await self.lesson_repository.get(data.lesson_id)
        if member.is_teacher:
            lesson.ensure_teacher_access(member.id)

        student_ids = [
            attendance.student_id for attendance in data.attendance_list
        ]
        if lesson.group_id and not self.student_group_repository.has_students(
            lesson.group_id,
            student_ids,
        ):
            raise InvalidAttendanceList()

        if lesson.course_teacher_student_id:
            if len(student_ids) > 1:
                raise TooManyAttendanceStudents()

            course_teacher_student = (
                await self.course_teacher_student_repository.get(
                    lesson.course_teacher_student_id,
                )
            )
            if course_teacher_student.student_id != student_ids[0]:
                raise InvalidAttendanceList()

        async with self.uow:
            attendance_list = [
                Attendance(**asdict(attendance), lesson_id=data.lesson_id)
                for attendance in data.attendance_list
            ]
            return await self.attendance_repository.bulk_create(
                attendance_list,
            )
