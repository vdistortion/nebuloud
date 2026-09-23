# Nebuloud — Music Archive and Artist Website Platform

Nebuloud is an Angular-based music archive and artist website platform with
discographies, lyrics, albums, videos, galleries, Directus and PostgreSQL.

Это музыкальный каталог с поддержкой артистов, альбомов, песен, текстов,
видео и фотогалерей. В будущем проект может вырасти в движок готовых сайтов
для музыкантов.

Текущая версия — Angular SSG/frontend с Directus + PostgreSQL как единственным
источником контента.

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

Проверить доступность production-сайта и Directus:

```bash
./scripts/smoke-production.sh
```

Создать production backup на VPS:

```bash
./scripts/backup-production.sh
```

Скрипт сохраняет PostgreSQL dump, volumes Garage и production `.env` в
`/root/backups/nebuloud/`. Backup нужно дополнительно копировать за пределы VPS.

Скачать backup на локальную машину можно через SSH:

```bash
BACKUP_STAMP=20260923-092025
mkdir -p ~/backups/nebuloud

scp -F /home/v/.ssh/config \
  "de-ai:/root/backups/nebuloud/postgres-$BACKUP_STAMP.dump" \
  "de-ai:/root/backups/nebuloud/garage-meta-$BACKUP_STAMP.tar.gz" \
  "de-ai:/root/backups/nebuloud/garage-data-$BACKUP_STAMP.tar.gz" \
  "de-ai:/root/backups/nebuloud/directus-uploads-$BACKUP_STAMP.tar.gz" \
  ~/backups/nebuloud/
```

Файл `env-$BACKUP_STAMP` содержит production-секреты и скачивается отдельно
только при необходимости восстановления:

```bash
scp -F /home/v/.ssh/config \
  "de-ai:/root/backups/nebuloud/env-$BACKUP_STAMP" \
  ~/backups/nebuloud/
chmod 600 ~/backups/nebuloud/env-$BACKUP_STAMP
```

Перед скачиванием следующего backup список файлов можно посмотреть так:

```bash
ssh -F /home/v/.ssh/config de-ai \
  'ls -lh /root/backups/nebuloud'
```

Для восстановления Garage нужны оба архива — `garage-meta` и `garage-data` —
одного timestamp. `pre-dedup-*.dump` — отдельная база до операции удаления
дубликатов, без архивов Garage.

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
master.nebuloud.zvalentin.com → web/nginx → профиль Мастера
shmeli.nebuloud.zvalentin.com → web/nginx → профиль Шмелей
api.nebuloud.zvalentin.com    → directus:8055
Directus → PostgreSQL
Directus → Garage (сеть garage)
```

Поддомены `master` и `shmeli` включены в runtime-конфигурации приложения.
Главный домен остаётся каталогом всех артистов. С карточки Мастера или Шмелей
с него выполняется переход на соответствующий поддомен; неизвестные hostnames
и остальные артисты продолжают использовать URL `/artist/<slug>`. На самом
поддомене текущие страницы также доступны по `/artist/<slug>/...`, а его корень
автоматически перенаправляется на профиль артиста.

Для запуска поддоменов нужны DNS-записи `A` или `CNAME` для `master` и
`shmeli`, указывающие на тот же VPS. Caddy получает эти имена через
`compose.production.yaml` и выпускает для них отдельные TLS-сертификаты.

Перед запуском должны существовать внешние Docker-сети `caddy` и `garage`, а
production-секреты должны быть заданы в `.env` на VPS. Caddy подключается через
лейблы compose и сам выпускает HTTPS-сертификаты.

Проект не подключён к `vps-infra` как submodule или package. Связь происходит
через внешние Docker-сети: Caddy публикует контейнеры по доменам, а Directus
подключается к Garage по сети `garage`. Общая инфраструктура находится в
`/home/v/Projects/vps-infra/` и должна быть запущена на VPS отдельно.

### GitHub Actions и секреты

Workflow `.github/workflows/ci-cd.yml` проверяет TypeScript, форматирование и
production-сборку на pull request и при push в `main`. После успешного push в
`main` он синхронизирует исходники на VPS, пересобирает только `web` и
перезапускает его. Контент и изображения берутся из Directus.

В GitHub Actions нужны следующие secrets:

- `VPS_HOST` — адрес VPS;
- `VPS_PORT` — SSH-порт, обычно `22`;
- `VPS_USER` — пользователь деплоя;
- `VPS_SSH_KEY` — приватный SSH-ключ без passphrase или ключ, доступный runner;
- `VPS_KNOWN_HOSTS` — строка из `ssh-keyscan` для этого VPS;
- `VPS_APP_PATH` — каталог проекта на VPS, сейчас `/root/nebuloud`.

Секреты PostgreSQL, Directus и Garage в GitHub Actions не нужны: они остаются
в `.env` на VPS и передаются Docker Compose локально на сервере. Для ключа SSH
лучше создать отдельную учётную запись с правами только на деплой, когда схема
перестанет использовать root.

### Caddy, nginx и Garage

Caddy из `vps-infra` — внешний reverse proxy: он принимает HTTP/HTTPS,
выпускает сертификаты и направляет домены в контейнеры. `nginx:alpine` внутри
`web` нужен только для раздачи готовых Angular SSG-файлов и fallback-маршрута
`index.html`. К Garage nginx отношения не имеет: Garage используется Directus
как S3-хранилище для изображений и файлов. Заменить nginx можно позже, если
отдавать собранную статику непосредственно другим HTTP-сервером, но текущая
пара Caddy + nginx разделяет внешний proxy и внутреннюю раздачу файлов.

## Directus + PostgreSQL

Локальный Directus запускается в отдельном Docker Compose-стеке вместе с PostgreSQL:

```bash
cp .env.example .env
docker compose up -d
```

Админка будет доступна по адресу `http://localhost:8056/`.

Production-адрес Directus: `https://api.nebuloud.zvalentin.com`.

URL Directus задаётся в `projects/nebuloud/public/config.js` для локального
запуска и заменяется Dockerfile на production URL при сборке:

```js
globalThis.__NEBULOUD_CONFIG__ = {
  directusUrl: 'https://api.nebuloud.zvalentin.com',
};
```

Пересобирать Angular для смены API-адреса не потребуется.

Создать базовые коллекции и поля Nebuloud:

```bash
python scripts/bootstrap-directus.py
```

Скрипт идемпотентный: существующие коллекции, поля и relations не пересоздаются.

Настроить webhook Flow и Telegram-уведомление:

```bash
python scripts/bootstrap-suggestion-flow.py
```

Скрипт использует `DIRECTUS_ADMIN_*`, `TELEGRAM_BOT_TOKEN` и
`TELEGRAM_CHAT_ID` из окружения. Telegram-токен не хранится в репозитории.

Проверить slug по текущей политике транслитерации:

```bash
./scripts/slugify.py 'Умрём живыми'
```

### Предложения по текстам

На production уже настроен поток предложений:

```text
форма на странице песни
  → Directus Flow
  → content_suggestions со статусом pending
  → уведомление в Telegram-группу
```

Telegram-токен хранится только в `.env` на VPS и не коммитится. Для чистого
развёртывания Flow пока нужно настроить отдельно в Directus; его конфигурацию
позже следует добавить в воспроизводимый bootstrap.

### Песни без текста

Альбомный треклист должен содержать полный состав альбома. Песня без текста
остаётся отдельной записью в коллекции `songs` Directus, но в публичном
треклисте отображается некликабельной и помечается как «текст отсутствует».
Список текстов такие записи не включает. У таких песен можно заранее указать
авторов через Directus.

Текущая форма предложений рассчитана на страницу песни с уже существующим
текстом. Отдельная доработка нужна для явного состояния песни без текста:

- добавить в Directus поле или статус `lyrics_status`, чтобы состояние не
  определялось только пустым полем `lyrics`;
- не показывать форму исправления на странице песни без текста;
- решить, показывать ли для таких позиций ссылку «Предложить текст» прямо в
  альбомном треклисте и направлять её в отдельную форму;
- после этого обновить Flow и payload предложений, чтобы различать исправление
  существующего текста и добавление нового.

### Временное скрытие контента

Сейчас публичный API читает записи без отдельного статуса публикации. Поэтому
перед production нужно добавить управляемую видимость контента: возможность
скрыть артиста, альбом, песню, галерею или отдельный файл без удаления данных.
Предпочтительно использовать поле `status` (`published`, `draft`, `hidden`) и
фильтровать публичные запросы по `status=published`.

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

## Изображения

Аватары, обложки и галереи хранятся в Directus Files через Garage. Локальная
копия изображений в репозитории не используется.
