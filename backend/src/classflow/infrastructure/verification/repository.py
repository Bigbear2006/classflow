import hashlib
import hmac
import logging
from typing import Any

from asyncpg.pgproto.pgproto import timedelta
from redis.asyncio import Redis

from classflow.application.verification.data_generator import VerificationData
from classflow.application.verification.repository import (
    VerificationDataRepository,
)
from classflow.domain.exceptions import (
    InvalidVerificationCodeError,
    TooManyAttemptsError,
)

MAX_ATTEMPTS = 5
CODE_TTL = timedelta(minutes=10)
RESEND_TTL = timedelta(minutes=1)

logger = logging.getLogger(__name__)


def _hash_code(code: str) -> str:
    return hashlib.sha256(code.encode()).hexdigest()


def _get_verify_email_key(token: str) -> str:
    return f'verify_email:{token}'


def _get_resend_resend_unavailable_key(token: str) -> str:
    return f'resend_unavailable:{token}'


class RedisVerificationDataRepository(VerificationDataRepository):
    def __init__(self, redis: Redis) -> None:
        self.redis = redis

    async def _get_saved_data(self, token: str) -> dict[str, Any]:
        key = _get_verify_email_key(token)
        saved_data = await self.redis.hgetall(key)
        if not saved_data:
            raise InvalidVerificationCodeError()
        return saved_data

    async def _set_code_data(self, token: str, data: dict[str, Any]) -> None:
        key = _get_verify_email_key(token)
        await self.redis.hset(key, mapping=data)
        await self.redis.expire(key, CODE_TTL)

    async def _set_resend_unavailable(self, token: str) -> None:
        resend_unavailable = _get_resend_resend_unavailable_key(token)
        await self.redis.set(resend_unavailable, 1, ex=RESEND_TTL)

    async def save(self, data: VerificationData, user_id: int) -> None:
        hashed_code = _hash_code(str(data.code))
        await self._set_code_data(
            data.token,
            {'code': hashed_code, 'user_id': user_id, 'attempts': 0},
        )
        await self._set_resend_unavailable(data.token)

    async def change_code(self, token: str, code: str) -> None:
        data = await self._get_saved_data(token)
        data['code'] = _hash_code(code)
        await self._set_code_data(token, data)
        await self._set_resend_unavailable(token)

    async def verify(self, data: VerificationData) -> int:
        saved_data = await self._get_saved_data(data.token)

        attempts = saved_data.get('attempts', 0)
        if int(attempts) >= MAX_ATTEMPTS:
            raise TooManyAttemptsError()

        if hmac.compare_digest(
            saved_data.get('code', ''),
            _hash_code(data.code),
        ):
            user_id = saved_data.get('user_id')
            if user_id and user_id.isdigit():
                return int(user_id)
            logger.info(f'Saved user_id is invalid: {user_id}')
            raise InvalidVerificationCodeError()

        saved_data['attempts'] = attempts + 1
        await self._set_code_data(data.token, saved_data)
        raise InvalidVerificationCodeError()

    async def resend_available(self, token: str) -> bool:
        resend_unavailable_key = _get_resend_resend_unavailable_key(token)
        return not bool(await self.redis.get(resend_unavailable_key))

    async def get_user_id(self, token: str) -> int:
        saved_data = await self._get_saved_data(token)
        return int(saved_data['user_id'])
