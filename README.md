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
