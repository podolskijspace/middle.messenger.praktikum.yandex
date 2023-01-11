ARG REGISTRY=github.com/podolskijspace/middle.messenger.praktikum.yandex
ARG IMAGE_BUILD=node
ARG TAG_BUILD=16-alpine

FROM ${IMAGE_BUILD}:${TAG_BUILD}
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD node server.js
