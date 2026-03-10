# Subs API

API для управления подписками и картами.

## Railway

Для деплоя в Railway не хардкодьте `${{ MongoDB.MONGO_URL }}` в коде.
Задайте переменную окружения сервиса `MONGODB_URI` со значением:

```bash
${{MongoDB.MONGO_URL}}
```

Без пробелов внутри шаблона.

## Требования

- Node.js 22.x
- Docker и Docker Compose (для деплоя с помощью контейнеров)
- MongoDB

## Установка и запуск

### Локальная разработка

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

3. Настройте переменные окружения в файле `.env`

4. Запустите MongoDB (если не используете Docker):
```bash
docker-compose up -d db
```

5. Запустите приложение в режиме разработки:
```bash
npm run dev
```

### Production деплой (локальный)

1. Скомпилируйте TypeScript:
```bash
npm run build
```

2. Запустите приложение:
```bash
npm start
```

### Деплой с Docker Compose

1. Убедитесь, что файл `.env` настроен правильно (для Docker используйте `mongodb://db:27017/opsflow` в MONGODB_URI)

2. Соберите и запустите контейнеры:
```bash
docker-compose up -d --build
```

3. Проверьте статус:
```bash
docker-compose ps
```

4. Просмотрите логи:
```bash
docker-compose logs -f app
```

5. Остановите контейнеры:
```bash
docker-compose down
```

## Доступные скрипты

- `npm run dev` - Запуск в режиме разработки с hot-reload
- `npm run build` - Компиляция TypeScript в JavaScript
- `npm start` - Запуск скомпилированного приложения

## API Документация

После запуска приложения документация Swagger доступна по адресу:
```
http://localhost:3000/api-docs
```

## Переменные окружения

- `APP_PORT` - Внешний порт контейнера app (по умолчанию 3000)
- `PORT` - Порт приложения внутри контейнера/процесса (по умолчанию 3000)
- `JWT_SECRET` - Секретный ключ для JWT токенов
- `MONGODB_URI` - URI подключения к MongoDB для локального запуска
  - Для локальной разработки: `mongodb://localhost:27017/opsflow`
- `DOCKER_MONGODB_URI` - URI MongoDB для Docker Compose (по умолчанию `mongodb://db:27017/opsflow`)
- `PRODUCTION_DOMAIN` - Домен для production окружения

## Структура проекта

```
opsFlowApi/
├── src/
│   ├── config/         # Конфигурация приложения
│   ├── controllers/    # Контроллеры API
│   ├── middleware/     # Middleware функции
│   ├── models/         # Mongoose модели
│   ├── routes/         # Маршруты API
│   ├── services/       # Бизнес-логика
│   ├── types/          # TypeScript типы и DTO
│   ├── validators/     # Схемы валидации
│   ├── app.ts          # Конфигурация Express приложения
│   └── server.ts       # Точка входа
├── dist/               # Скомпилированный JavaScript код
├── data/               # MongoDB данные (для Docker)
├── Dockerfile          # Docker образ приложения
├── docker-compose.yml  # Docker Compose конфигурация
└── package.json        # Зависимости и скрипты
```

## Решение проблем

### Ошибка "Cannot find module '/app/dist/server.js'"

Эта ошибка возникает, когда TypeScript код не был скомпилирован перед запуском. Решение:

1. Локально: выполните `npm run build` перед `npm start`
2. Docker: убедитесь, что в Dockerfile есть шаг `RUN npm run build`

### Порт 3000 занят при `docker compose up`

Добавьте/измените в `.env`:
```bash
APP_PORT=3001
```

После этого перезапустите:
```bash
docker compose down
docker compose up -d --build
```

Приложение будет доступно на `http://localhost:3001`.

### MongoDB connection errors

Убедитесь, что:
1. MongoDB запущена
2. MONGODB_URI в `.env` правильно настроен
3. Для Docker используйте имя сервиса `db` вместо `localhost`
