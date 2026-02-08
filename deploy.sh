#!/bin/bash

# EdgeOne Pages 部署脚本
# 使用方法: ./deploy.sh 或 bash deploy.sh

echo "🚀 开始部署 EdgeOne Pages 图床..."
echo ""

# 检查是否安装了 edgeone CLI
if ! command -v edgeone &> /dev/null; then
    echo "❌ 未找到 edgeone CLI"
    echo "请先安装: npm install -g @edgeone/cli"
    exit 1
fi

# 检查是否登录
if ! edgeone whoami &> /dev/null; then
    echo "⚠️  未登录 EdgeOne"
    echo "正在打开浏览器进行登录..."
    edgeone login
fi

# 部署
echo "📤 正在部署到 EdgeOne Pages..."
echo ""

# 使用项目根目录部署（包含 functions 和 pages）
edgeone pages deploy . --project-name=image-hosting --binding IMAGES=images --output-dir=pages

echo ""
echo "✅ 部署完成！"
echo ""
echo "下一步操作："
echo "1. 登录 EdgeOne Pages 控制台"
echo "2. 找到 image-hosting 项目"
echo "3. 在「设置」-「KV 存储」中绑定 IMAGES 命名空间"
echo "4. 访问你的域名开始使用图床"
