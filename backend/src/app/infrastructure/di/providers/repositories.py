from dishka import Provider, Scope, provide

from app.application.repositories.address import AddressRepository
from app.application.repositories.attendance import AttendanceRepository
from app.application.repositories.cabinet import CabinetRepository
from app.application.repositories.course import CourseRepository
from app.application.repositories.course_teacher import CourseTeacherRepository
from app.application.repositories.course_teacher_student import (
    CourseTeacherStudentRepository,
)
from app.application.repositories.feedback import FeedbackRepository
from app.application.repositories.group import GroupRepository
from app.application.repositories.lesson import LessonRepository
from app.application.repositories.organization import OrganizationRepository
from app.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from app.application.repositories.payment import PaymentRepository
from app.application.repositories.subject import SubjectRepository
from app.application.repositories.user import UserRepository
from app.application.repositories.user_group import UserGroupRepository
from app.infrastructure.db.repositories.address import AddressRepositoryImpl
from app.infrastructure.db.repositories.attendance import (
    AttendanceRepositoryImpl,
)
from app.infrastructure.db.repositories.cabinet import CabinetRepositoryImpl
from app.infrastructure.db.repositories.course import CourseRepositoryImpl
from app.infrastructure.db.repositories.course_teacher import (
    CourseTeacherRepositoryImpl,
)
from app.infrastructure.db.repositories.course_teacher_student import (
    CourseTeacherStudentRepositoryImpl,
)
from app.infrastructure.db.repositories.feedback import FeedbackRepositoryImpl
from app.infrastructure.db.repositories.group import GroupRepositoryImpl
from app.infrastructure.db.repositories.lesson import LessonRepositoryImpl
from app.infrastructure.db.repositories.organization import (
    OrganizationRepositoryImpl,
)
from app.infrastructure.db.repositories.organization_member import (
    OrganizationMemberRepositoryImpl,
)
from app.infrastructure.db.repositories.payment import PaymentRepositoryImpl
from app.infrastructure.db.repositories.subject import SubjectRepositoryImpl
from app.infrastructure.db.repositories.user import UserRepositoryImpl
from app.infrastructure.db.repositories.user_group import (
    UserGroupRepositoryImpl,
)


class RepositoriesProvider(Provider):
    scope = Scope.REQUEST

    user_repository = provide(UserRepositoryImpl, provides=UserRepository)
    user_group = provide(UserGroupRepositoryImpl, provides=UserGroupRepository)
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
