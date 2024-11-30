FROM node:lts-bookworm as builder
WORKDIR /app
COPY ./daocker-ui /app
RUN yarn install && yarn build

FROM nginx:latest as prod
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80




