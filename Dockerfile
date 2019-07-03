FROM node:10.16.0-alpine

WORKDIR /usr/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /usr/app/package.json
COPY public /usr/app/public
COPY src /usr/app/src

RUN npm install

ENTRYPOINT ["npm", "start"]