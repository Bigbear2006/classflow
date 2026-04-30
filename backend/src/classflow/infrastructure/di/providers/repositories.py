from dishka import Provider, Scope, provide

from classflow.application.repositories.address import AddressRepository
from classflow.application.repositories.attendance import AttendanceRepository
from classflow.application.repositories.cabinet import CabinetRepository
from classflow.application.repositories.course import CourseRepository
from classflow.application.repositories.course_teacher import (
    CourseTeacherRepository,
)
from classflow.application.repositories.course_teacher_student import (
    CourseTeacherStudentRepository,
)
from classflow.application.repositories.feedback import FeedbackRepository
from classflow.application.repositories.group import GroupRepository
from classflow.application.repositories.lesson import LessonRepository
from classflow.application.repositories.organization import (
    OrganizationRepository,
)
from classflow.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from classflow.application.repositories.payment import PaymentRepository
from classflow.application.repositories.subject import SubjectRepository
from classflow.application.repositories.user import UserRepository
from classflow.application.repositories.student_group import StudentGroupRepository
from classflow.infrastructure.db.repositories.address import (
    AddressRepositoryImpl,
)
from classflow.infrastructure.db.repositories.attendance import (
    AttendanceRepositoryImpl,
)
from classflow.infrastructure.db.repositories.cabinet import (
    CabinetRepositoryImpl,
)
from classflow.infrastructure.db.repositories.course import (
    CourseRepositoryImpl,
)
from classflow.infrastructure.db.repositories.course_teacher import (
    CourseTeacherRepositoryImpl,
)
from classflow.infrastructure.db.repositories.course_teacher_student import (
    CourseTeacherStudentRepositoryImpl,
)
from classflow.infrastructure.db.repositories.feedback import (
    FeedbackRepositoryImpl,
)
from classflow.infrastructure.db.repositories.group import GroupRepositoryImpl
from classflow.infrastructure.db.repositories.lesson import (
    LessonRepositoryImpl,
)
from classflow.infrastructure.db.repositories.organization import (
    OrganizationRepositoryImpl,
)
from classflow.infrastructure.db.repositories.organization_member import (
    OrganizationMemberRepositoryImpl,
)
from classflow.infrastructure.db.repositories.payment import (
    PaymentRepositoryImpl,
)
from classflow.infrastructure.db.repositories.subject import (
    SubjectRepositoryImpl,
)
from classflow.infrastructure.db.repositories.user import UserRepositoryImpl
from classflow.infrastructure.db.repositories.student_group import (
    StudentGroupRepositoryImpl,
)


class RepositoriesProvider(Provider):
    scope = Scope.REQUEST

    user_repository = provide(UserRepositoryImpl, provides=UserRepository)
    user_group = provide(StudentGroupRepositoryImpl, provides=StudentGroupRepository)
    organization_repository = provide(
        OrganizationRepositoryImpl,
        provides=OrganizationRepository,
    )
    organization_member_repository = provide(
        OrganizationMemberRepositoryImpl,
        provides=OrganizationMemberRepository,
    )
    address_repository = provide(
        AddressRepositoryImpl,
        provides=AddressRepository,
    )
    cabinet_repository = provide(
        CabinetRepositoryImpl,
        provides=CabinetRepository,
    )
    subject_repository = provide(
        SubjectRepositoryImpl,
        provides=SubjectRepository,
    )
    course_repository = provide(
        CourseRepositoryImpl,
        provides=CourseRepository,
    )
    course_teacher_repository = provide(
        CourseTeacherRepositoryImpl,
        provides=CourseTeacherRepository,
    )
    course_teacher_student = provide(
        CourseTeacherStudentRepositoryImpl,
        provides=CourseTeacherStudentRepository,
    )
    group = provide(GroupRepositoryImpl, provides=GroupRepository)
    lesson = provide(LessonRepositoryImpl, provides=LessonRepository)
    attendance = provide(
        AttendanceRepositoryImpl,
        provides=AttendanceRepository,
    )
    payment = provide(PaymentRepositoryImpl, provides=PaymentRepository)
    feedback = provide(FeedbackRepositoryImpl, provides=FeedbackRepository)
