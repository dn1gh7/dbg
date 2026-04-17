# Base image only: your live Strapi code comes from the ./cms bind mount in docker-compose.
# Scaffold Strapi into ./cms first (see ../docker-compose.yaml).
FROM node:20-bookworm-slim

WORKDIR /srv/app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 build-essential \
  && rm -rf /var/lib/apt/lists/*

EXPOSE 1337
