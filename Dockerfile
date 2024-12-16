FROM m.daocloud.io/node as prepare

WORKDIR /app

# 使用国内镜像，加快速度
RUN yarn install --registry=https://registry.npmmirror.com 


FROM m.daocloud.io/node as builder

WORKDIR /app

# 复制源代码
COPY daocker-ui .
COPY --from=prepare /app/node_modules /app/node_modules
COPY --from=prepare /app/*.json  .
RUN yarn && yarn build

# --------------------------------------------------------

FROM m.daocloud.io/nginx:latest as prod

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]




