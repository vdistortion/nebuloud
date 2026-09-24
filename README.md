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

Запустить сайт артиста локально:

```bash
npm run start:artist -- --slug master --port 4201
```

Каталог останется на `http://localhost:4200/`, сайт артиста откроется на
`http://localhost:4201/`.

Production SSG-сборка каталога и всех артистов с доменом:

```bash
DIRECTUS_URL=https://api.nebuloud.zvalentin.com MAIN_DOMAIN=nebuloud.zvalentin.com npm run build
```

Статические файлы появятся в `dist/sites/`: сборка каталога и отдельная SSG-сборка для каждого артиста с доменом.

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

Для VPS предусмотрен отдельный compose-файл. Сначала создай поле `site_domain`
в Directus через `scripts/bootstrap-directus.py` и заполни его у артистов. Для
текущих сайтов Мастера и Шмелей укажи `master.nebuloud.zvalentin.com` и
`shmeli.nebuloud.zvalentin.com`. В поле вводится hostname без схемы и пути.

После сборки compose получает сгенерированные из Directus домены для Caddy и CORS:

```bash
DIRECTUS_URL=https://api.nebuloud.zvalentin.com MAIN_DOMAIN=nebuloud.zvalentin.com SUGGESTION_WEBHOOK_URL=https://api.nebuloud.zvalentin.com/flows/trigger/f1866803-f7b3-4dd1-9d59-bec46289c5e5 npm run build
set -a
. dist/sites/deploy/deploy.env
set +a
docker compose -f compose.production.yaml up -d db directus
docker compose -f compose.production.yaml build web
docker compose -f compose.production.yaml up -d web
```

В deploy workflow каталог собирается один раз, затем artist-приложение
SSG-собирается отдельно для каждого артиста с заполненным `site_domain`.
На VPS передаются готовые статические файлы и созданная из тех же данных
конфигурация nginx/Caddy. Там собирается только небольшой nginx-образ.

Тот же workflow можно запустить вручную через `Actions → CI/CD → Run
workflow`. Такой запуск пересобирает SSG из текущих данных Directus и
деплоит результат без нового коммита. Это нужно после изменений контента,
которые были сделаны непосредственно в Directus.

Production-схема рассчитана на общие сети из `/home/v/Projects/vps-infra/`:

```text
nebuloud.zvalentin.com        → web/nginx → Angular SSG
<site_domain из Directus>   → Caddy → web/nginx → SSG-сайт артиста
api.nebuloud.zvalentin.com    → directus:8055
Directus → PostgreSQL
Directus → Garage (сеть garage)
```

Полный домен артиста задаётся в поле `site_domain` коллекции `artists` в
Directus, без `https://` и пути. Это единственный источник соответствия артистов
доменам. Если поле пустое, профиль и все его страницы остаются на главном сайте
по адресу `/artist/<slug>`. Если домен задан, карточка каталога ведёт сразу на
`https://<site_domain>/`, а сайт артиста отдаёт SSG-страницы по чистым путям
`/`, `/album/...`, `/songs`, `/song/...`, `/images` и `/video`.

Сборка проверяет домены на корректный формат и дубликаты. Из Directus также
генерируются маршруты nginx для выбора SSG-файлов, Caddy host list и CORS
allowlist Directus. Старые URL `/artist/<slug>/...` на главном домене
перенаправляются на соответствующий домен артиста.

Для каждого домена нужна DNS-запись `A` или `CNAME`, указывающая на VPS. Caddy
получает список доменов из сгенерированного deploy-файла и выпускает TLS-
сертификаты. После изменения `site_domain` нужно заново собрать и развернуть
сайты; для этого подходит `Actions → CI/CD → Run workflow`.

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
- `VPS_PORT` — SSH-порт, необязательно; если секрет пустой, workflow использует `22`;
- `VPS_USER` — пользователь деплоя, необязательно; если секрет пустой, workflow использует `root`;
- `VPS_SSH_KEY` — приватный SSH-ключ без passphrase или ключ, доступный runner;
- `VPS_KNOWN_HOSTS` — необязательно: публичный ключ SSH-хоста из `ssh-keyscan`;
  если секрет задан, workflow строго проверяет его перед подключением, а если
  пустой — принимает новый ключ один раз на текущем runner;
- `VPS_APP_PATH` — каталог проекта на VPS, сейчас `/root/nebuloud`.

Секреты PostgreSQL, Directus и Garage в GitHub Actions не нужны: они остаются
в `.env` на VPS и передаются Docker Compose локально на сервере. Для ключа SSH
лучше создать отдельную учётную запись с правами только на деплой, когда схема
перестанет использовать root.

Получить `VPS_KNOWN_HOSTS` можно локально так, подставив реальный адрес и порт:

```bash
ssh-keyscan -H -p 22 your-vps.example.com
```

Весь выведенный текст нужно сохранить в GitHub Secret `VPS_KNOWN_HOSTS`.

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

URL Directus для локального запуска задаётся в
`projects/shared/public/config.js`. Production runtime-конфигурация создаётся
скриптом сборки из переменных окружения. Домены в этот файл не попадают: они
читаются из `artists.site_domain` в Directus.

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
projects/
  catalog/   Angular-приложение каталога
  artist/    Angular-приложение отдельного сайта артиста
  shared/    общие Angular-страницы, UI, модели и сервисы
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

На домене артиста приложение использует чистые пути:

```text
/                                      профиль артиста
/album/:album                         альбом
/song/:song                           песня и текст
/songs                                тексты песен
/video                                видео
/images                               фотогалереи
/images/:gallery                      отдельная галерея
```

## Изображения

Аватары, обложки и галереи хранятся в Directus Files через Garage. Локальная
копия изображений в репозитории не используется.
