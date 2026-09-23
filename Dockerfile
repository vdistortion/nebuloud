FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/nebuloud/browser /usr/share/nginx/html

EXPOSE 80
