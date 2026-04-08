# from aioboto3 import Session
# from aiobotocore.session import get_session
# from botocore.client import BaseClient
#
# from app.application.common.file_storage import FileStorage
#
#
# class S3FileStorage(FileStorage):
#     def __init__(self) -> None:
#         self.session = Session
#
#     async def save_file(self) -> str:
#         async with self.session.create_client('s3') as client:
#             rsp = await client.put_object
#
#
#     async def get_file(self) -> str:
#         pass
