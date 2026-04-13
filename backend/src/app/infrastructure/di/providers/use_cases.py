from dishka import Provider, Scope, provide_all

from app.application.use_cases.address.create import CreateAddress
from app.application.use_cases.address.delete import DeleteAddress
from app.application.use_cases.address.get_all import GetAllAddresses
from app.application.use_cases.address.update import UpdateAddress
from app.application.use_cases.cabinet.create import CreateCabinet
from app.application.use_cases.cabinet.delete import DeleteCabinet
from app.application.use_cases.course.add_current_student import (
    AddCurrentStudentToCourse,
)
from app.application.use_cases.course.add_teacher import AddTeacherToCourse
from app.application.use_cases.course.create import CreateCourse
from app.application.use_cases.course.delete_teacher import (
    DeleteTeacherFromCourse,
)
from app.application.use_cases.course.get_all import GetAllCourses
from app.application.use_cases.course.get_my import GetMyCourses
from app.application.use_cases.course.get_students import (
    GetCourseTeacherStudents,
)
from app.application.use_cases.course.get_teachers import GetCourseTeachers
from app.application.use_cases.course.update import UpdateCourse
from app.application.use_cases.organization.create import CreateOrganization
from app.application.use_cases.organization.get_all import GetAllOrganizations
from app.application.use_cases.organization.get_current import (
    GetCurrentOrganization,
)
from app.application.use_cases.organization.get_current_org_all_members import (
    GetCurrentOrganizationAllMembers,
)
from app.application.use_cases.organization.get_current_org_member import (
    GetCurrentOrganizationMember,
)
from app.application.use_cases.organization.get_my import GetMyOrganizations
from app.application.use_cases.organization.join import JoinOrganization
from app.application.use_cases.organization.update_member import (
    UpdateOrganizationMember,
)
from app.application.use_cases.subject.create import CreateSubject
from app.application.use_cases.subject.delete import DeleteSubject
from app.application.use_cases.subject.get_all import GetAllSubjects
from app.application.use_cases.subject.update import UpdateSubject
from app.application.use_cases.user.change_password import ChangeUserPassword
from app.application.use_cases.user.get_current import GetCurrentUser
from app.application.use_cases.user.login import LoginUser
from app.application.use_cases.user.register import RegisterUser
from app.application.use_cases.user.update_current import UpdateCurrentUser


class UseCasesProvider(Provider):
    scope = Scope.REQUEST

    user = provide_all(
        RegisterUser,
        LoginUser,
        GetCurrentUser,
        UpdateCurrentUser,
        ChangeUserPassword,
    )
    organization = provide_all(
        CreateOrganization,
        JoinOrganization,
        GetAllOrganizations,
        GetCurrentOrganization,
        GetCurrentOrganizationMember,
        GetMyOrganizations,
        GetCurrentOrganizationAllMembers,
        UpdateOrganizationMember,
    )
    address = provide_all(
        CreateAddress,
        GetAllAddresses,
        UpdateAddress,
        DeleteAddress,
    )
    cabinet = provide_all(CreateCabinet, DeleteCabinet)
    subject = provide_all(
        CreateSubject,
        GetAllSubjects,
        UpdateSubject,
        DeleteSubject,
    )
    course = provide_all(
        CreateCourse,
        AddTeacherToCourse,
        AddCurrentStudentToCourse,
        DeleteTeacherFromCourse,
        GetAllCourses,
        GetMyCourses,
        UpdateCourse,
        GetCourseTeacherStudents,
        GetCourseTeachers,
    )
