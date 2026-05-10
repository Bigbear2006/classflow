from uuid import uuid4

from types_aiobotocore_s3.client import S3Client

from classflow.application.common.dto import FileDTO
from classflow.application.common.file_storage import FileStorage
from classflow.domain.exceptions import ValidationError

EXTENSIONS_MAP = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
}


class S3FileStorage(FileStorage):
    def __init__(self, client: S3Client, bucket_name: str) -> None:
        self.client = client
        self.bucket_name = bucket_name

    async def save(
        self,
        file: FileDTO,
        *,
        prefix: str | None = None,
        filename: str | None = None,
    ) -> str:
        filename = filename or uuid4().hex
        filename = f'{prefix}{filename}' if prefix else filename

        ext = EXTENSIONS_MAP.get(file.content_type)
        if not ext:
            raise ValidationError('Unsupported image content type')

        filename = f'{filename}.{ext}'
        await self.client.upload_fileobj(
            file.file,
            Bucket=self.bucket_name,
            Key=filename,
            ExtraArgs={'ContentType': file.content_type},
        )
        return filename

    async def delete(self, filename: str) -> None:
        await self.client.delete_object(Bucket=self.bucket_name, Key=filename)
