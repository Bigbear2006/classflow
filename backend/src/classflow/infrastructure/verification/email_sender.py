import logging

from aiohttp import ClientSession

from classflow.application.verification.email_sender import EmailSender

logger = logging.getLogger(__name__)


class NotiSendEmailSender(EmailSender):
    def __init__(self, session: ClientSession, from_email: str) -> None:
        self.session = session
        self.from_email = from_email

    async def send_code(self, code: str, to: str) -> None:
        html = (
            '<h2>Ваш код подтверждения</h2>'
            f'<h1>{code}</h1>'
            f'<h2>Код действует 10 минут</h2>'
        )
        async with self.session.post(
            'messages',
            json={
                'from_email': self.from_email,
                'to': to,
                'subject': 'Подтверждение email',
                'html': html,
            },
        ) as rsp:
            logger.info(f'Sent email to {to}: {rsp.status}')
