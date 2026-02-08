# 推送到 GitHub 指南

## 📋 推送前准备

### 1. 创建 GitHub 仓库

1. 登录 GitHub: https://github.com
2. 点击右上角的 "+" → "New repository"
3. 填写仓库信息：
   - Repository name: `image-hosting` (或其他名称)
   - Description: `基于 EdgeOne Pages 和 KV 存储的开源图床服务`
   - Public/Private: 选择 Public (公开)
   - 不要勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 2. 初始化本地 Git 仓库

在终端中进入项目目录：

```bash
cd c:/Users/ds/CodeBuddy/555

# 初始化 Git 仓库
git init

# 添加所有文件（除了 .gitignore 中排除的）
git add .

# 提交更改
git commit -m "Initial commit: EdgeOne Pages 图床"
```

### 3. 推送到 GitHub

在 GitHub 创建的仓库页面，复制 HTTPS 或 SSH 地址：

**HTTPS 方式** (推荐新手):
```bash
# 添加远程仓库
git remote add origin https://github.com/你的用户名/image-hosting.git

# 推送到 GitHub
git push -u origin main
```

**SSH 方式** (需要配置 SSH 密钥):
```bash
# 添加远程仓库
git remote add origin git@github.com:你的用户名/image-hosting.git

# 推送到 GitHub
git push -u origin main
```

### 4. 验证推送

访问 `https://github.com/你的用户名/image-hosting` 查看是否成功。

## 📝 后续更新

### 修改代码后提交

```bash
# 查看修改的文件
git status

# 添加修改的文件
git add 文件名
# 或者添加所有修改
git add .

# 提交更改
git commit -m "描述你的更改"

# 推送到 GitHub
git push
```

### 分支管理（可选）

```bash
# 创建新分支
git checkout -b feature/新功能

# 在新分支上工作...

# 切换回主分支
git checkout main

# 合并分支
git merge feature/新功能

# 推送到 GitHub
git push
```

## 🔧 配置 Git（如果还没配置）

如果这是第一次使用 Git，需要配置用户信息：

```bash
# 配置用户名
git config --global user.name "你的名字"

# 配置邮箱
git config --global user.email "你的邮箱@example.com"
```

## 🐛 常见问题

### 问题 1: "fatal: remote origin already exists"

**解决**：
```bash
# 删除旧的远程仓库
git remote remove origin

# 重新添加
git remote add origin https://github.com/你的用户名/image-hosting.git
```

### 问题 2: "src refspec main does not match any"

**解决**：
```bash
# 先提交代码
git add .
git commit -m "Initial commit"

# 再推送
git push -u origin main
```

### 问题 3: 推送时提示输入用户名密码

**解决**：
1. 使用个人访问令牌 (Personal Access Token)
2. 或者配置 SSH 密钥

参考：https://docs.github.com/cn/authentication

### 问题 4: "main" 分支不存在

Git 2.28+ 默认分支可能是 "main"，旧版本可能是 "master":

```bash
# 查看当前分支
git branch

# 如果显示 "master"，重命名为 "main"
git branch -M main

# 然后推送
git push -u origin main
```

## 🎯 GitHub 功能设置

### 设置默认分支保护

1. 进入仓库 Settings → Branches
2. 点击 "Add rule"
3. 分支名称模式: `main`
4. 勾选：
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

### 启用 Issues

在仓库 Settings → General → Features 中：
- ✅ Issues
- ✅ Discussions (可选)

### 添加仓库描述和标签

1. 点击仓库主页的 "Edit"
2. 添加详细的仓库描述
3. 添加标签（Topics）：
   - `image-hosting`
   - `edgeone-pages`
   - `kv-storage`
   - `vanilla-js`

## 🚀 进阶操作

### 添加部署按钮

在 README.md 中添加一键部署按钮：

```markdown
[![Deploy to EdgeOne Pages](https://cdn.jsdelivr.net/gh/lencx/static@main/2024/04/button-2.svg)](https://edgeone.cloud.tencent.com/pages/templates/detail/image-hosting)
```

### 添加 GitHub Actions（可选）

创建 `.github/workflows/deploy.yml` 实现自动部署：

```yaml
name: Deploy to EdgeOne Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to EdgeOne Pages
        run: |
          npm install -g @edgeone/pages-cli
          eop auth login --token ${{ secrets.EOP_TOKEN }}
          eop deploy
```

## 📊 验证完成

推送完成后，你的仓库应该包含：

- [x] `index.html` - 主页面
- [x] `admin.html` - 后台管理
- [x] `functions/` - API 函数
- [x] `README.md` - 项目说明
- [x] `LICENSE` - MIT 许可证
- [x] `.gitignore` - Git 忽略配置
- [x] `package.json` - 项目配置
- [x] `wrangler.toml` - EdgeOne 配置
- [x] 其他配置文件

## 🎉 下一步

推送成功后：

1. **Star 你的项目** ⭐
2. **分享给朋友** 📢
3. **开始部署到 EdgeOne Pages** 🚀
4. **持续维护和更新** 🔧

## 💡 有用的 GitHub 功能

- **Issues**: 跟踪 bug 和功能请求
- **Pull Requests**: 接受社区贡献
- **Discussions**: 与用户交流
- **Projects**: 管理开发进度
- **Wiki**: 编写详细文档
- **Actions**: 自动化 CI/CD

---

🎊 恭喜！你的项目已经成功推送到 GitHub！
