FROM node:24-slim AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && corepack prepare yarn@stable --activate

RUN yarn install && yarn cache clean
COPY . .
RUN yarn build

FROM nginx:1.29-alpine-slim

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]
