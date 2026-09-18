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

## Directus + PostgreSQL

Локальный Directus запускается в отдельном Docker Compose-стеке вместе с PostgreSQL:

```bash
cp .env.example .env
docker compose up -d
```

Админка будет доступна по адресу `http://localhost:8056/`.

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

Сейчас скрипт переносит аватары артистов и обложки альбомов. Большие фотогалереи
пока не загружаются автоматически.

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
/artist/:artist/songs/other            песни вне альбомов
/artist/:artist/video                  видео
/artist/:artist/images                 фотогалереи
/artist/:artist/images/:gallery        отдельная галерея
```

## Локальные изображения

Изображения в `projects/nebuloud/public/artist/` не коммитятся в репозиторий,
чтобы не раздувать Git-историю. Для локального запуска они должны находиться в
этом каталоге. Стратегию хранения production-изображений решим при переходе к
Directus или внешнему файловому хранилищу.
