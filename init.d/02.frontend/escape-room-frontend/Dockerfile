FROM node:24-slim AS builder

ARG VITE_ADDON_PATHS
ENV VITE_ADDON_PATHS=$VITE_ADDON_PATHS

WORKDIR /app
RUN corepack enable && corepack prepare yarn@stable --activate
COPY package.json yarn.lock ./
RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn install && yarn cache clean

RUN yarn install && yarn cache clean

# Copy escape room files
COPY . .

RUN yarn && yarn build

FROM nginx:1.29-alpine-slim

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]
