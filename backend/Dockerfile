FROM node:20.9.0-alpine3.17

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY .env ./.env
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY jest.config.ts ./jest.config.ts
COPY jest.setup.ts ./jest.setup.ts

CMD npm run dev