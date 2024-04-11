FROM node:18.14.0-alpine as builder
WORKDIR /app

COPY .eslintrc.json /app/.eslintrc.json
COPY .yarn /app/.yarn

RUN corepack enable && yarn set version 3.1.1

COPY package.json /app/package.json
COPY --from=mern-graphql-stack-graphql-client:latest /app/ /app/client
RUN cd /app/client && npm link

COPY yarn.lock /app/yarn.lock
COPY .yarnrc.yml /app/.yarnrc.yml

RUN yarn install

COPY tsconfig.json /app/tsconfig.json
COPY webpack.config.js /app/webpack.config.js
COPY public /app/public
COPY src /app/src

ARG GRAPHQL_URL
RUN touch /app/.env && echo "GRAPHQL_URL=$GRAPHQL_URL" >> /app/.env

RUN npm run build

FROM node:18.14.0-alpine
WORKDIR /app
EXPOSE 80

COPY --from=builder /app/.env /app/.env
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/public /app/public
COPY --from=builder /app/client /app/client
COPY --from=builder /app/build /app/build

COPY server /app/server

CMD ["npm", "start"]