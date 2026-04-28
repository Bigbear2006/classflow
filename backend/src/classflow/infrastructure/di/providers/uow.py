from dishka import Provider, Scope, provide

from classflow.application.common.uow import UnitOfWork
from classflow.infrastructure.db.uow import SqlalchemyUnitOfWork


class UnitOfWorkProvider(Provider):
    uow = provide(
        SqlalchemyUnitOfWork,
        scope=Scope.REQUEST,
        provides=UnitOfWork,
    )
