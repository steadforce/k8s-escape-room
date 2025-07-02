FROM node:24-slim AS builder

WORKDIR /app
RUN corepack enable && corepack prepare yarn@stable --activate
COPY package.json yarn.lock ./

RUN yarn install && yarn cache clean
COPY . .
RUN yarn build

FROM nginx:1.29-alpine-slim

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]
