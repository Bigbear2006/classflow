from dishka import Provider, Scope, provide

from classflow.application.services.permission import PermissionService


class ServicesProvider(Provider):
    scope = Scope.REQUEST

    permission = provide(PermissionService)
