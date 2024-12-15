FROM dockerproxy.net/library/node:lts-bookworm as builder

WORKDIR /app

# 复制源代码
COPY daocker-ui .

# 使用国内镜像，加快速度
RUN yarn install --registry=https://registry.npmmirror.com && yarn build

# --------------------------------------------------------

FROM dockerproxy.net/library/nginx:latest as prod

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]




