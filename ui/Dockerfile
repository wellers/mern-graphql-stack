FROM node:20.12.2-alpine as builder
WORKDIR /app

COPY .eslintrc.json /app/.eslintrc.json

RUN corepack enable pnpm

COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=mern-graphql-stack-graphql-client:latest /app/ /app/client
RUN cd /app/client && pnpm link /app/client

RUN pnpm i

COPY tsconfig.json /app/tsconfig.json
COPY webpack.config.js /app/webpack.config.js
COPY public /app/public
COPY src /app/src

ARG GRAPHQL_URL
RUN touch /app/.env && echo "GRAPHQL_URL=$GRAPHQL_URL" >> /app/.env

RUN pnpm build

FROM node:20.12.2-alpine
WORKDIR /app
EXPOSE 80

RUN corepack enable pnpm

COPY --from=builder /app/.env /app/.env
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/public /app/public
COPY --from=builder /app/client /app/client
COPY --from=builder /app/build /app/build

COPY server /app/server

CMD ["pnpm", "start"]