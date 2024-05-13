FROM postgres:13.3-buster

COPY init.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD 123456
ENV POSTGRES_DB trabfinalDB

FROM node:21-alpine

ENV TZ=America/Sao_Paulo
RUN mkdir -p /home/node/horus

WORKDIR /home/node/horus

COPY ./package.json ./
COPY ./src ./src

RUN npm install

EXPOSE 3000

CMD ["node", "./src/index.js"]