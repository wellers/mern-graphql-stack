FROM node:18.14.0

WORKDIR /app

RUN npm install -g ts-node

# npm install in a way that allows caching
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY webpack.config.js /app/webpack.config.js
COPY public /app/public

RUN cd /app && npm install

# copy the rest of the content
EXPOSE 80
COPY server /app/server
COPY src /app/src

ARG GRAPHQL_URL
RUN ["sh", "-c", "touch /app/.env"]

RUN echo "GRAPHQL_URL=$GRAPHQL_URL" >> /app/.env

RUN npm run build
CMD ["npm", "start"]