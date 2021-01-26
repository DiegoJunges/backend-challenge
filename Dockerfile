FROM node:12-slim

WORKDIR usr/src/app

COPY package.json yarn.lock ./

COPY yarn.lock ./

RUN yarn --production

COPY . .

RUN yarn build

COPY . .

EXPOSE 8080
CMD ["node", "dist/index.js"]

