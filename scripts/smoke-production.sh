#!/usr/bin/env bash
set -euo pipefail

SITE_URL="${SITE_URL:-https://nebuloud.zvalentin.com}"
API_URL="${API_URL:-https://api.nebuloud.zvalentin.com}"

curl --fail --silent --show-error "$API_URL/server/ping" | grep -qx 'pong'

routes=(
  '/'
  '/artist/master/'
  '/artist/master/album/master/'
  '/artist/master/song/master/'
  '/artist/master/songs/'
  '/artist/master/video/'
  '/artist/shmely/images/'
  '/artist/shmely/images/1/'
)

for route in "${routes[@]}"; do
  body="$(curl --fail --silent --show-error --location "$SITE_URL$route")"
  grep -q '<app-root' <<< "$body"
  if grep -q 'localhost:8056' <<< "$body"; then
    echo "local Directus URL found in $route" >&2
    exit 1
  fi
  printf 'ok %s\n' "$route"
done
