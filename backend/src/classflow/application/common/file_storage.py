from typing import Protocol

from classflow.application.common.dto import FileDTO


class FileStorage(Protocol):
    async def save(
        self,
        file: FileDTO,
        *,
        prefix: str | None = None,
        filename: str | None = None,
    ) -> str:
        pass

    async def delete(self, filename: str) -> None:
        pass
