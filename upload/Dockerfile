FROM oven/bun:1.1.6-alpine

WORKDIR /app

RUN mkdir files && chmod ugo+w files

COPY package.json bun.lockb ./

RUN bun i

COPY ./src ./src

CMD ["bun", "src/index.ts"]
