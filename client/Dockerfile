FROM node:18.14.0-alpine

COPY .yarn /app/.yarn
COPY yarn.lock /app/yarn.lock

# install desired version of yarn
RUN corepack enable && yarn set version 3.1.1

COPY package.json /app/package.json
RUN cd /app && yarn install

COPY dist /app/dist

WORKDIR /app