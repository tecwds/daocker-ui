#!/bin/bash

image_name=${IMAGE_NAME:-"daocker-ui"}
tag=${TAG:-"v1.0"}

# 构建
docker buildx build -t ${image_name}:${tag} ..