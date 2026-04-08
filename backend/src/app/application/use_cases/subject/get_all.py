from app.application.repositories.subject import SubjectRepository
from app.domain.entities import Subject


class GetAllSubjects:
    def __init__(self, subject_repository: SubjectRepository) -> None:
        self.subject_repository = subject_repository

    async def __call__(self) -> list[Subject]:
        return await self.subject_repository.get_all()
