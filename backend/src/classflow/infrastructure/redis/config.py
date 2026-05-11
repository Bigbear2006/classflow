from dataclasses import dataclass, field

from environs import env

env.read_env()


@dataclass
class RedisConfig:
    HOST: str = field(default_factory=lambda: env('REDIS_HOST'))
    PORT: int = field(default_factory=lambda: env('REDIS_PORT'))
    PASSWORD: str = field(default_factory=lambda: env('REDIS_PASSWORD'))
    DB: int = field(default_factory=lambda: env('REDIS_DB'))
