from pydantic import BaseModel, ConfigDict, field_validator

from classflow.infrastructure.di.container import container
from classflow.infrastructure.storage.config import S3StorageConfig


class SubjectResponse(BaseModel):
    id: int
    organization_id: int
    name: str
    image: str
    description: str
    model_config = ConfigDict(from_attributes=True)

    @field_validator('image')
    @classmethod
    def validate_image(cls, value: str) -> str:
        s3_config = container.get_sync(S3StorageConfig)
        return f'{s3_config.S3_BASE_URL}{value}'


class UpdateSubjectRequest(BaseModel):
    name: str | None = None
    image: str | None = None
    description: str | None = None
