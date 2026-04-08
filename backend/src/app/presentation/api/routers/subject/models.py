from pydantic import BaseModel, ConfigDict


class SubjectResponse(BaseModel):
    id: int
    organization_id: int
    name: str
    image: str
    description: str
    model_config = ConfigDict(from_attributes=True)


class UpdateSubjectRequest(BaseModel):
    name: str | None = None
    image: str | None = None
    description: str | None = None
