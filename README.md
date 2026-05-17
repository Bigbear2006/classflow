# ClassFlow

Сайт для управления учебным процессом дополнительного образования

### Features:
- JWT-аутентификация
- Подтверждение email
- Хранение файлов в S3
- Доступ по ролям

## Запуск

### Клонируйте репозиторий
```
git clone https://github.com/Bigbear2006/classflow.git
```

### Создайте файл backend/.env
```
JWT_SECRET_KEY=
# Используется для параметра domain в cookie
# Для localhost оставьте пустым
DOMAIN=.example.com

S3_BUCKET_NAME=
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_ENDPOINT_URL=
S3_REGION_NAME=

POSTGRES_DB=
POSTGRES_HOST=db
POSTGRES_PORT=5432

POSTGRES_USER=postgres
POSTGRES_PASSWORD=

POSTGRES_APP_USER=app_user
POSTGRES_APP_PASSWORD=

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

NOTI_SEND_API_KEY=
FROM_EMAIL=admin@example.com

GF_SECURITY_ADMIN_PASSWORD=
```

### Запустите
```
docker-compose up --build -d
# или
make
```
После этого сайт будет доступен по адресу http://localhost