FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG DIRECTUS_URL=https://api.nebuloud.zvalentin.com
RUN sed -i "s#http://localhost:8056#${DIRECTUS_URL}#; s/contentMode: 'fallback'/contentMode: 'directus'/; s#suggestionWebhookUrl: ''#suggestionWebhookUrl: 'https://api.nebuloud.zvalentin.com/flows/trigger/f1866803-f7b3-4dd1-9d59-bec46289c5e5'#" projects/nebuloud/public/config.js
RUN DIRECTUS_URL=${DIRECTUS_URL} CONTENT_MODE=directus \
  SUGGESTION_WEBHOOK_URL=https://api.nebuloud.zvalentin.com/flows/trigger/f1866803-f7b3-4dd1-9d59-bec46289c5e5 \
  npm run build

FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/nebuloud/browser /usr/share/nginx/html

EXPOSE 80
