FROM nginx:alpine

COPY dist/sites/deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/sites/catalog /usr/share/nginx/html/sites/catalog
COPY dist/sites/artists /usr/share/nginx/html/sites/artists

EXPOSE 80
