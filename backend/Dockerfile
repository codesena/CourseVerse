FROM node:alpine3.19

WORKDIR /usr/src/app

COPY package*.json .

COPY .env.example .env

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","run","dev" ]