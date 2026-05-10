from classflow.presentation.api.routers.course.models import (
    CourseWithSubjectResponse,
)
from classflow.presentation.api.routers.organization.models import (
    OrganizationMemberDetailResponse,
)


class TeacherWithFeedbackResponse(OrganizationMemberDetailResponse):
    rating: int
    feedback_count: int
    user_can_add_feedback: bool
    courses: list[CourseWithSubjectResponse]
