from dataclasses import dataclass, field

from environs import env

env.read_env()


@dataclass
class DatabaseConfig:
    NAME: str = field(default_factory=lambda: env('POSTGRES_DB'))
    HOST: str = field(default_factory=lambda: env('POSTGRES_HOST'))
    PORT: int = field(default_factory=lambda: env.int('POSTGRES_PORT'))
    # Superuser
    USER: str = field(default_factory=lambda: env('POSTGRES_USER'))
    PASSWORD: str = field(default_factory=lambda: env('POSTGRES_PASSWORD'))
    # User with row level security enabled
    APP_USER: str = field(default_factory=lambda: env('POSTGRES_APP_USER'))
    APP_PASSWORD: str = field(
        default_factory=lambda: env('POSTGRES_APP_PASSWORD'),
    )

    @property
    def url(self) -> str:
        return f'postgresql+asyncpg://{self.APP_USER}:{self.APP_PASSWORD}@{self.HOST}:{self.PORT}/{self.NAME}'

    @property
    def superuser_url(self) -> str:
        return f'postgresql+asyncpg://{self.USER}:{self.PASSWORD}@{self.HOST}:{self.PORT}/{self.NAME}'
