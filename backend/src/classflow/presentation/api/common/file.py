from fastapi import UploadFile

from classflow.application.common.dto import FileDTO


def map_file_to_dto(file: UploadFile) -> FileDTO:
    return FileDTO(
        file=file.file,
        content_type=file.content_type,
    )
