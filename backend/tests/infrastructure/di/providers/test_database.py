from classflow.infrastructure.db.config import DatabaseConfig
from dishka import Provider, Scope, provide


class TestDatabaseProvider(Provider):
    @provide(scope=Scope.APP, override=True)
    def provide_database_config(self) -> DatabaseConfig:
        return DatabaseConfig(NAME='test_db', APP_USER='test_user')
