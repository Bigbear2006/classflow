from dataclasses import dataclass, field

from environs import env

env.read_env()


@dataclass
class EmailConfig:
    NOTI_SEND_API_KEY: str = field(
        default_factory=lambda: env('NOTI_SEND_API_KEY'),
    )
    FROM_EMAIL: str = field(default_factory=lambda: env('FROM_EMAIL'))
