FROM node:18.18.2-alpine

WORKDIR /usr/src/api

COPY . .

RUN npm install -g pnpm
RUN pnpm install --quiet --no-optional --loglevel=error
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]