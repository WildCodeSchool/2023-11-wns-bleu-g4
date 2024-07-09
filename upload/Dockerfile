# FROM oven/bun:1.1.6-alpine

# WORKDIR /app

# RUN mkdir files && chmod ugo+w files

# COPY package.json bun.lockb ./

# RUN bun i --frozen-lockfile

# COPY ./src ./src

# RUN bun build ./src/index.ts --compile --outfile cli

# USER bun

# CMD ["/app/cli"]

FROM oven/bun:1.1.6-alpine

WORKDIR /app

RUN mkdir files && chmod ugo+w files

COPY package.json bun.lockb ./

RUN bun i --frozen-lockfile

COPY ./src ./src

# Construction avec vérification et correction du chemin
RUN bun build ./src/index.ts --compile --outfile /app/cli && ls -l /app

# Assure-toi que le fichier est exécutable
RUN chmod +x /app/cli

USER bun

CMD ["/app/cli"]

