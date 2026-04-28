from dishka import Provider, Scope, provide_all

from classflow.application.use_cases.address import (
    CreateAddress,
    DeleteAddress,
    GetAllAddresses,
    UpdateAddress,
)
from classflow.application.use_cases.cabinet import (
    CreateCabinet,
    DeleteCabinet,
    GetAllCabinets,
)
from classflow.application.use_cases.course import (
    AddCurrentStudentToCourse,
    AddTeacherToCourse,
    CreateCourse,
    DeleteTeacherFromCourse,
    GetAllCourses,
    GetCourseGroups,
    GetCourseTeachers,
    GetCourseTeacherStudents,
    GetMyCourses,
    UpdateCourse,
)
from classflow.application.use_cases.group import (
    AddUserToGroup,
    CreateGroup,
    GetAllGroups,
    GetGroupById,
    GetGroupUsers,
    RemoveUserFromGroup,
    UpdateGroup,
)
from classflow.application.use_cases.lesson import (
    CreateLesson,
    DeleteLesson,
    GetAllLessons,
    GetMyLessons,
    UpdateLesson,
)
from classflow.application.use_cases.organization import (
    CreateOrganization,
    GetAllCurrentOrganizationMembers,
    GetAllOrganizations,
    GetCurrentOrganization,
    GetCurrentOrganizationMember,
    GetMyOrganizations,
    JoinOrganization,
    UpdateOrganizationMember,
)
from classflow.application.use_cases.subject import (
    CreateSubject,
    DeleteSubject,
    GetAllSubjects,
    UpdateSubject,
)
from classflow.application.use_cases.user import (
    ChangeUserPassword,
    GetCurrentUser,
    LoginUser,
    RegisterUser,
    UpdateCurrentUser,
)


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
        GetAllCurrentOrganizationMembers,
        UpdateOrganizationMember,
    )
    address = provide_all(
        CreateAddress,
        GetAllAddresses,
        UpdateAddress,
        DeleteAddress,
    )
    cabinet = provide_all(CreateCabinet, GetAllCabinets, DeleteCabinet)
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
        GetCourseGroups,
        GetCourseTeachers,
    )
    group = provide_all(
        CreateGroup,
        GetAllGroups,
        GetGroupById,
        UpdateGroup,
        GetGroupUsers,
        AddUserToGroup,
        RemoveUserFromGroup,
    )
    lesson = provide_all(
        CreateLesson,
        UpdateLesson,
        GetAllLessons,
        GetMyLessons,
        DeleteLesson,
    )
