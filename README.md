# Nebuloud

Музыкальный каталог на Angular с артистами, альбомами, песнями, текстами,
видео и фотогалереями.

Текущая версия — статический frontend на локальном TypeScript-каталоге.
Дальнейшее подключение Directus + PostgreSQL предусмотрено архитектурой, но не
требуется для разработки интерфейса.

## Документация

Главный источник решений и плана проекта:

- [ARCHITECTURE.md](ARCHITECTURE.md)

Визуальный референс текущего интерфейса находится вне репозитория:

```text
/home/v/Desktop/NebuloudProject/new_design/
```

## Разработка

Установить зависимости:

```bash
npm install
```

Запустить dev-сервер:

```bash
npm start
```

Открыть `http://localhost:4200/`.

Production-сборка:

```bash
npm run build
```

Статические файлы появятся в `dist/nebuloud/`.

## Production на VPS

Для VPS предусмотрен отдельный compose-файл:

```bash
docker compose -f compose.production.yaml up -d db directus
docker compose -f compose.production.yaml build web
docker compose -f compose.production.yaml up -d web
```

Production-схема рассчитана на общие сети из `/home/v/Projects/vps-infra/`:

```text
nebuloud.zvalentin.com        → web/nginx → Angular SSG
api.nebuloud.zvalentin.com    → directus:8055
Directus → PostgreSQL
Directus → Garage (сеть garage)
```

Перед запуском должны существовать внешние Docker-сети `caddy` и `garage`, а
production-секреты должны быть заданы в `.env` на VPS. Caddy подключается через
лейблы compose и сам выпускает HTTPS-сертификаты.

## Directus + PostgreSQL

Локальный Directus запускается в отдельном Docker Compose-стеке вместе с PostgreSQL:

```bash
cp .env.example .env
docker compose up -d
```

Админка будет доступна по адресу `http://localhost:8056/`.

Будущий временный production-адрес Directus: `https://api.nebuloud.zvalentin.com`.

URL Directus задаётся в `projects/nebuloud/public/config.js`. Для production при
деплое нужно заменить значения:

```js
globalThis.__NEBULOUD_CONFIG__ = {
  directusUrl: 'https://api.nebuloud.zvalentin.com',
  contentMode: 'directus',
};
```

Пересобирать Angular для смены API-адреса не потребуется.

Режимы контента:

- `fallback` — Directus с переходом на локальную базу при ошибке;
- `directus` — только Directus, production-режим;
- `local` — только локальная база для offline/demo-режима.

Создать базовые коллекции и поля Nebuloud:

```bash
python scripts/bootstrap-directus.py
```

Скрипт идемпотентный: существующие коллекции, поля и relations не пересоздаются.

Импортировать текстовый каталог из локальной `db`:

```bash
npx --yes tsx scripts/migrate-static-content.ts
```

Импорт переносит артистов, альбомы, песни, тексты, связи треков с альбомами и
ссылки на стриминги. Локальные изображения импортируются отдельным шагом:

```bash
npx --yes tsx scripts/migrate-covers.ts
```

Сейчас скрипт переносит аватары артистов и обложки альбомов. Фотогалереи
переносятся отдельным скриптом:

```bash
npx --yes tsx scripts/migrate-galleries.ts
```

Скрипт идемпотентный и сохраняет структуру галерей, порядок фотографий и ссылки
на Directus Assets.

Проверить полноту миграции локального каталога в Directus:

```bash
npx --yes tsx scripts/verify-content.ts
```

Скрипт сравнивает количество и slug артистов, альбомов, песен и галерей, а
также выводит отсутствующие записи.

Остановить стек:

```bash
docker compose down
```

Данные хранятся в Docker volumes и не попадают в репозиторий. Для полного
сброса локального Directus вместе с базой используется `docker compose down -v`.

## Структура

```text
projects/nebuloud/src/
  app/       Angular-страницы, layout, UI и сервисы
  db/        текущий локальный каталог артистов и контента
  styles.scss глобальные стили и design tokens
```

Основные маршруты:

```text
/                                      каталог артистов
/artist/:artist                       профиль артиста
/artist/:artist/album/:album           альбом
/artist/:artist/song/:song             песня и текст
/artist/:artist/songs                  тексты песен
/artist/:artist/songs?other=true          фильтр песен вне альбомов
/artist/:artist/video                  видео
/artist/:artist/images                 фотогалереи
/artist/:artist/images/:gallery        отдельная галерея
```

## Локальные изображения

Изображения в `projects/nebuloud/public/artist/` не коммитятся в репозиторий,
чтобы не раздувать Git-историю. Для локального запуска они должны находиться в
этом каталоге. Стратегию хранения production-изображений решим при переходе к
Directus или внешнему файловому хранилищу.
