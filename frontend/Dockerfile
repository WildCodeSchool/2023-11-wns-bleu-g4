FROM node:20.9.0-alpine3.17

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY src ./src
COPY public ./public
COPY .env ./.env
COPY tsconfig.json ./tsconfig.json
COPY next-env.d.ts ./next-env.d.ts
COPY next.config.js ./next.config.js
COPY i18next-parser.config.js ./i18next-parser.config.js
COPY next-i18next.config.js ./next-i18next.config.js
COPY i18nUtils.js ./i18nUtils.js
COPY postcss.config.js ./postcss.config.js
COPY tailwind.config.ts ./tailwind.config.ts

CMD npm run dev