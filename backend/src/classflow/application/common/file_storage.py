from typing import Protocol


class FileStorage(Protocol):
    async def save_file(self) -> str:
        pass

    async def get_file(self) -> str:
        pass
