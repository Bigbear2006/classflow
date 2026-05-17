from dishka import Provider, Scope, provide_all

from classflow.application.use_cases.address import (
    CreateAddress,
    DeleteAddress,
    GetAllAddresses,
    UpdateAddress,
)
from classflow.application.use_cases.attendance import (
    BulkCreateAttendance,
    GetAttendanceStats,
    GetCoursesAttendanceStats,
    GetStudentAttendance,
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
    DeleteCourse,
    DeleteTeacherFromCourse,
    GetAllCourses,
    GetCourseGroups,
    GetCourseTeachers,
    GetCourseTeacherStudents,
    GetCourseTeacherStudentsWithPayments,
    GetIndividualCourses,
    GetMyCourses,
    UpdateCourse,
    UpdateCourseTeacher,
    UpdateCourseTeacherStudent,
)
from classflow.application.use_cases.group import (
    AddCurrentStudentToGroup,
    AddStudentToGroup,
    CreateGroup,
    DeleteGroup,
    GetAllGroups,
    GetGroupById,
    GetGroupsWithPayments,
    GetGroupsWithStudents,
    GetGroupsWithTeachers,
    GetGroupUsers,
    RemoveUserFromGroup,
    UpdateGroup,
    UpdateStudentGroup,
)
from classflow.application.use_cases.lesson import (
    CreateLesson,
    DeleteLesson,
    GetAllLessons,
    GetMyLessons,
    GetStudentsWithAttendance,
    UpdateLesson,
)
from classflow.application.use_cases.organization import (
    CreateOrganization,
    GetAllCurrentOrganizationMembers,
    GetAllOrganizations,
    GetCurrentOrganization,
    GetCurrentOrganizationMember,
    GetMyOrganizations,
    GetOrganizationStats,
    GetRoleCounts,
    GetStudentStats,
    GetTeacherStats,
    JoinOrganization,
    UpdateCurrentOrganization,
    UpdateOrganizationMember,
)
from classflow.application.use_cases.payment import (
    CreatePayment,
    DeletePayment,
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
    ResendVerificationCode,
    UpdateCurrentUser,
    VerifyUserEmail,
)


class UseCasesProvider(Provider):
    scope = Scope.REQUEST

    user = provide_all(
        RegisterUser,
        VerifyUserEmail,
        ResendVerificationCode,
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
        GetRoleCounts,
        GetOrganizationStats,
        GetStudentStats,
        GetTeacherStats,
        UpdateOrganizationMember,
        UpdateCurrentOrganization,
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
        UpdateCourseTeacher,
        AddCurrentStudentToCourse,
        DeleteTeacherFromCourse,
        GetAllCourses,
        GetIndividualCourses,
        GetMyCourses,
        UpdateCourse,
        GetCourseTeacherStudents,
        UpdateCourseTeacherStudent,
        GetCourseTeacherStudentsWithPayments,
        GetCourseGroups,
        GetCourseTeachers,
        DeleteCourse,
    )
    group = provide_all(
        CreateGroup,
        GetAllGroups,
        GetGroupById,
        UpdateGroup,
        GetGroupUsers,
        GetGroupsWithPayments,
        GetGroupsWithTeachers,
        GetGroupsWithStudents,
        AddStudentToGroup,
        AddCurrentStudentToGroup,
        RemoveUserFromGroup,
        UpdateStudentGroup,
        DeleteGroup,
    )
    lesson = provide_all(
        CreateLesson,
        UpdateLesson,
        GetAllLessons,
        GetMyLessons,
        GetStudentsWithAttendance,
        DeleteLesson,
    )
    payment = provide_all(CreatePayment, DeletePayment)
    attendance = provide_all(
        BulkCreateAttendance,
        GetStudentAttendance,
        GetAttendanceStats,
        GetCoursesAttendanceStats,
    )
