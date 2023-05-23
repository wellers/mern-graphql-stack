FROM node:18.14.0-alpine

# install desired version of yarn
RUN corepack enable && yarn set version 3.2.1

COPY package.json /app/package.json
COPY .yarn /app/.yarn
COPY yarn.lock /app/yarn.lock
RUN cd /app && yarn install

COPY dist /app/dist

WORKDIR /app