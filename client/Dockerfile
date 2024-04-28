FROM node:20.12.2-alpine

COPY .eslintrc.json .eslintrc.json

RUN corepack enable pnpm

# pnpm install in a way that allows caching
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
RUN cd /app && pnpm i

COPY dist /app/dist

WORKDIR /app