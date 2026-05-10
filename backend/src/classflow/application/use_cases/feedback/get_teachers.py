from classflow.application.repositories.feedback import FeedbackRepository


class GetTeachersWithFeedback:
    def __init__(self, feedback_repository: FeedbackRepository):
        self.feedback_repository = feedback_repository

    async def __call__(self) -> list:
        pass
