#!/bin/bash

# 服务器配置
SERVER_HOST="47.120.54.56"  # 替换为你的服务器IP
SERVER_USER="root"           # 替换为你的服务器用户名
SERVER_PATH="/usr/web/vehicle-management"  # 替换为服务器上的部署目录
SSH_KEY="/Users/berk/Downloads/nginx_admin.pem"  # 指定 SSH 私钥路径

# 打包项目
echo "开始打包..."
npm run build

# 创建远程目录
echo "创建远程目录..."
ssh -i ${SSH_KEY} ${SERVER_USER}@${SERVER_HOST} "mkdir -p ${SERVER_PATH}"

# 上传文件
echo "开始上传文件..."
scp -i ${SSH_KEY} -r dist/* ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/

# 设置权限
echo "设置权限..."
ssh -i ${SSH_KEY} ${SERVER_USER}@${SERVER_HOST} "chmod -R 755 ${SERVER_PATH}"

echo "部署完成！"