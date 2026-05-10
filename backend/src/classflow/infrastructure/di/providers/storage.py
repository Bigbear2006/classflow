from collections.abc import AsyncIterable

from aioboto3 import Session
from dishka import Provider, Scope, provide
from types_aiobotocore_s3.client import S3Client

from classflow.application.common.file_storage import FileStorage
from classflow.infrastructure.storage.config import S3StorageConfig
from classflow.infrastructure.storage.s3 import S3FileStorage


class StorageProvider(Provider):
    @provide(scope=Scope.APP)
    def provide_config(self) -> S3StorageConfig:
        return S3StorageConfig()

    @provide(scope=Scope.APP)
    def provide_session(self, s3_config: S3StorageConfig) -> Session:
        return Session(
            aws_access_key_id=s3_config.S3_ACCESS_KEY,
            aws_secret_access_key=s3_config.S3_SECRET_KEY,
            region_name=s3_config.S3_REGION_NAME,
        )

    @provide(scope=Scope.REQUEST)
    async def provide_client(
        self,
        session: Session,
        s3_config: S3StorageConfig,
    ) -> AsyncIterable[S3Client]:
        async with session.client(
            's3',
            endpoint_url=s3_config.S3_ENDPOINT_URL,
        ) as client:
            yield client

    @provide(scope=Scope.REQUEST)
    def provide_file_storage(
        self,
        client: S3Client,
        s3_config: S3StorageConfig,
    ) -> FileStorage:
        return S3FileStorage(client, s3_config.S3_BUCKET_NAME)
