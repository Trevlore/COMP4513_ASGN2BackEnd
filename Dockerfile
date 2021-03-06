FROM node:13

ENV NODE_ENV=production

RUN mkdir /opt/app

COPY ./ /opt/app

WORKDIR /opt/app

RUN npm i

ENTRYPOINT node /opt/app/index.js
