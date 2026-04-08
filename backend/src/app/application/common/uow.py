from types import TracebackType
from typing import Protocol


class UnitOfWork(Protocol):
    async def commit(self) -> None:
        pass

    async def rollback(self) -> None:
        pass

    async def flush(self) -> None:
        pass

    async def __aenter__(self) -> 'UnitOfWork':
        pass

    async def __aexit__(
        self,
        exc_type: type[BaseException] | None,
        exc_val: BaseException | None,
        exc_tb: TracebackType | None,
    ) -> None:
        pass
