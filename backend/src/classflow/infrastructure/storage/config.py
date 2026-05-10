from dataclasses import dataclass, field

from environs import env

env.read_env()


@dataclass
class S3StorageConfig:
    S3_BUCKET_NAME: str = field(default_factory=lambda: env('S3_BUCKET_NAME'))
    S3_ACCESS_KEY: str = field(default_factory=lambda: env('S3_ACCESS_KEY'))
    S3_SECRET_KEY: str = field(default_factory=lambda: env('S3_SECRET_KEY'))
    S3_ENDPOINT_URL: str = field(
        default_factory=lambda: env('S3_ENDPOINT_URL'),
    )
    S3_REGION_NAME: str = field(default_factory=lambda: env('S3_REGION_NAME'))

    @property
    def S3_BASE_URL(self) -> str:
        return f'{self.S3_ENDPOINT_URL}/{self.S3_BUCKET_NAME}/'
