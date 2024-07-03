# #!/bin/bash
# set -a
# source .env.production
# set +a
# git fetch origin

# git reset --hard origin/staging
# docker compose -f docker-compose.production.yml down
# docker compose -f docker-compose.production.yml pull
# docker compose -f docker-compose.production.yml up -d



#!/bin/sh
git fetch origin && git reset --hard origin/staging && git clean -f -d && \
docker compose -f docker-compose.production.yml down && \
docker compose -f docker-compose.production.yml pull && \
docker compose -f docker-compose.production.yml --env-file .env.production up -d;