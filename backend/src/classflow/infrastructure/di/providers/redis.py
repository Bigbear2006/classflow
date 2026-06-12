from dishka import Provider, Scope, provide
from redis.asyncio import Redis

from classflow.infrastructure.redis.config import RedisConfig


class RedisProvider(Provider):
    @provide(scope=Scope.APP)
    def provide_redis_config(self) -> RedisConfig:
        return RedisConfig()

    @provide(scope=Scope.APP)
    def provide_redis(self, config: RedisConfig) -> Redis:  # type: ignore[type-arg]
        return Redis(
            host=config.HOST,
            port=config.PORT,
            db=config.DB,
            password=config.PASSWORD,
            decode_responses=True,
        )
