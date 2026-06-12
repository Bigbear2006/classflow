from classflow.application.verification.email_sender import EmailSender


class TestEmailSender(EmailSender):
    async def send_code(self, code: str, to: str) -> None:
        print(f'Send code {code} to {to}')
