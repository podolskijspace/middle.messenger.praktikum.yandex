ARG REGISTRY=github.com/podolskijspace/middle.messenger.praktikum.yandex
ARG IMAGE_BUILD=ubuntu
ARG TAG_BUILD=18.04

FROM ${IMAGE_BUILD}:${TAG_BUILD}
RUN apt update && apt install -y nodejs && apt install -y npm && npm install
WORKDIR /var/www
COPY ./server.js server.js
EXPOSE 3000
CMD node server.js
