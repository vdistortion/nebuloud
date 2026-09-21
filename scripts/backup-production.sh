#!/usr/bin/env bash
set -euo pipefail

# Run on the VPS from the project directory.
BACKUP_DIR="${BACKUP_DIR:-/root/backups/nebuloud}"
STAMP="$(date +%Y%m%d-%H%M%S)"
COMPOSE=(docker compose --env-file .env -f compose.production.yaml)

mkdir -p "$BACKUP_DIR"

"${COMPOSE[@]}" exec -T db pg_dump \
  -U "${POSTGRES_USER:-nebuloud}" \
  -Fc --no-owner "${POSTGRES_DB:-nebuloud}" \
  > "$BACKUP_DIR/postgres-$STAMP.dump"

# Garage is a shared VPS service. Back up its metadata and data volumes
# separately from the project database.
docker run --rm \
  -v garage_garage_meta:/data:ro \
  -v "$BACKUP_DIR":/backup \
  alpine:latest sh -c "tar czf /backup/garage-meta-$STAMP.tar.gz -C /data ."

docker run --rm \
  -v garage_garage_data:/data:ro \
  -v "$BACKUP_DIR":/backup \
  alpine:latest sh -c "tar czf /backup/garage-data-$STAMP.tar.gz -C /data ."

# Keep the production environment recoverable, but restrict the backup file.
cp .env "$BACKUP_DIR/env-$STAMP"
chmod 600 "$BACKUP_DIR/env-$STAMP"

printf 'Backups created in %s:\n' "$BACKUP_DIR"
ls -lh "$BACKUP_DIR"/*"$STAMP"*
