from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from classflow.application.use_cases.course import (
    AddCurrentStudentToCourse,
    AddCurrentStudentToCourseDTO,
    AddTeacherToCourse,
    AddTeacherToCourseDTO,
    CreateCourse,
    CreateCourseDTO,
    DeleteTeacherFromCourse,
    DeleteTeacherFromCourseDTO,
    GetAllCourses,
    GetCourseGroups,
    GetCourseGroupsDTO,
    GetCourseTeachers,
    GetCourseTeachersDTO,
    GetCourseTeacherStudents,
    GetCourseTeacherStudentsDTO,
    GetCourseTeacherStudentsWithPayments,
    GetIndividualCourses,
    GetMyCourses,
    UpdateCourse,
    UpdateCourseDTO,
    UpdateCourseTeacher,
    UpdateCourseTeacherDTO,
    UpdateCourseTeacherStudent,
    UpdateCourseTeacherStudentDTO,
)
from classflow.presentation.api.routers.course.models import (
    CourseDetailResponse,
    CourseResponse,
    CourseTeacherResponse,
    CourseTeacherStudentResponse,
    CourseTeacherStudentWithPaymentsResponse,
    CourseWithSubjectResponse,
    IndividualCourseResponse,
    UpdateCourseRequest,
    UpdateCourseTeacherRequest,
    UpdateCourseTeacherStudentRequest,
)
from classflow.presentation.api.routers.group.models import GroupDetailResponse
from classflow.presentation.api.routers.organization.models import (
    OrganizationMemberDetailResponse,
)
from classflow.presentation.api.routers.user.models import UserResponse

course_router = APIRouter(
    prefix='/courses',
    route_class=DishkaRoute,
    tags=['courses'],
)


@course_router.post('/', status_code=201)
async def create_course_router(
    data: CreateCourseDTO,
    create_course: FromDishka[CreateCourse],
) -> CourseResponse:
    course = await create_course(data)
    return CourseResponse.model_validate(course)


@course_router.get('/')
async def get_courses_router(
    get_all_courses: FromDishka[GetAllCourses],
) -> list[CourseDetailResponse]:
    courses = await get_all_courses()
    return [CourseDetailResponse.model_validate(course) for course in courses]


@course_router.get('/individual/')
async def get_individual_courses_router(
    get_individual_courses: FromDishka[GetIndividualCourses],
) -> list[IndividualCourseResponse]:
    courses = await get_individual_courses()
    return [
        IndividualCourseResponse.model_validate(course) for course in courses
    ]


@course_router.put('/{course_id}/')
async def update_course_router(
    course_id: int,
    data: UpdateCourseRequest,
    update_course: FromDishka[UpdateCourse],
) -> CourseResponse:
    dto = UpdateCourseDTO(id=course_id, **data.model_dump())
    course = await update_course(dto)
    return CourseResponse.model_validate(course)


@course_router.get('/my/')
async def get_my_courses_router(
    get_my_courses: FromDishka[GetMyCourses],
) -> list[CourseWithSubjectResponse]:
    courses = await get_my_courses()
    return [
        CourseWithSubjectResponse.model_validate(course) for course in courses
    ]


@course_router.get('/{course_id}/groups/')
async def get_course_groups_router(
    course_id: int,
    get_course_groups: FromDishka[GetCourseGroups],
) -> list[GroupDetailResponse]:
    dto = GetCourseGroupsDTO(course_id=course_id)
    groups = await get_course_groups(dto)
    return [GroupDetailResponse.model_validate(group) for group in groups]


@course_router.post('/{course_id}/teachers/{teacher_id}/', status_code=201)
async def add_teacher_to_course_router(
    course_id: int,
    teacher_id: int,
    add_teacher_to_course: FromDishka[AddTeacherToCourse],
) -> CourseTeacherResponse:
    dto = AddTeacherToCourseDTO(course_id=course_id, teacher_id=teacher_id)
    course_teacher = await add_teacher_to_course(dto)
    return CourseTeacherResponse.model_validate(course_teacher)


@course_router.patch('/{course_id}/teachers/{teacher_id}/')
async def update_course_teacher_router(
    course_id: int,
    teacher_id: int,
    data: UpdateCourseTeacherRequest,
    update_course_teacher: FromDishka[UpdateCourseTeacher],
) -> CourseTeacherResponse:
    dto = UpdateCourseTeacherDTO(
        course_id=course_id,
        teacher_id=teacher_id,
        **data.model_dump(),
    )
    course_teacher = await update_course_teacher(dto)
    return CourseTeacherResponse.model_validate(course_teacher)


@course_router.get('/{course_id}/teachers/')
async def get_course_teachers_router(
    course_id: int,
    get_course_teachers: FromDishka[GetCourseTeachers],
) -> list[OrganizationMemberDetailResponse]:
    dto = GetCourseTeachersDTO(course_id=course_id)
    teachers = await get_course_teachers(dto)
    return [
        OrganizationMemberDetailResponse.model_validate(teacher)
        for teacher in teachers
    ]


@course_router.delete('/{course_id}/teachers/{teacher_id}/', status_code=204)
async def delete_teacher_from_course_router(
    course_id: int,
    teacher_id: int,
    delete_teacher_from_course: FromDishka[DeleteTeacherFromCourse],
) -> None:
    dto = DeleteTeacherFromCourseDTO(
        course_id=course_id,
        teacher_id=teacher_id,
    )
    await delete_teacher_from_course(dto)


@course_router.post(
    '/{course_id}/teachers/{teacher_id}/students/me/',
    status_code=201,
)
async def add_current_student_to_course_teacher_router(
    course_id: int,
    teacher_id: int,
    add_current_student_to_course: FromDishka[AddCurrentStudentToCourse],
) -> CourseTeacherStudentResponse:
    dto = AddCurrentStudentToCourseDTO(
        course_id=course_id,
        teacher_id=teacher_id,
    )
    course_teacher_student = await add_current_student_to_course(dto)
    return CourseTeacherStudentResponse.model_validate(course_teacher_student)


@course_router.get('/{course_id}/teachers/{teacher_id}/students/')
async def get_course_teacher_students_router(
    course_id: int,
    teacher_id: int,
    get_course_teacher_students: FromDishka[GetCourseTeacherStudents],
) -> list[UserResponse]:
    dto = GetCourseTeacherStudentsDTO(
        course_id=course_id,
        teacher_id=teacher_id,
    )
    students = await get_course_teacher_students(dto)
    return [UserResponse.model_validate(student) for student in students]


@course_router.patch(
    '/{course_id}/teachers/{teacher_id}/students/{student_id}/',
)
async def update_course_teacher_student_router(
    course_id: int,
    teacher_id: int,
    student_id: int,
    data: UpdateCourseTeacherStudentRequest,
    update_course_teacher_student: FromDishka[UpdateCourseTeacherStudent],
) -> CourseTeacherStudentResponse:
    dto = UpdateCourseTeacherStudentDTO(
        course_id=course_id,
        teacher_id=teacher_id,
        student_id=student_id,
        **data.model_dump(),
    )
    cts = await update_course_teacher_student(dto)
    return CourseTeacherStudentResponse.model_validate(cts)


@course_router.get('/teachers/students/payments/')
async def get_course_teacher_students_payments_router(
    get_with_payments: FromDishka[GetCourseTeacherStudentsWithPayments],
) -> list[CourseTeacherStudentWithPaymentsResponse]:
    students = await get_with_payments()
    return [
        CourseTeacherStudentWithPaymentsResponse.model_validate(student)
        for student in students
    ]
