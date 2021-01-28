FROM node:12

WORKDIR /app

COPY package.json /app

RUN yarn install --production

COPY . .

RUN yarn build

COPY ormconfig.js /app

ENV NODE_ENV production

RUN rm -rf src/

CMD ["node", "dist/shared/infra/http/server.js"]



