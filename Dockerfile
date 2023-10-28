# 使用官方 Node.js 18 图像作为基础图像
FROM node:18

# 创建应用程序目录
WORKDIR /usr/src/app

# 安装 pnpm
RUN npm install -g pnpm

# 安装应用程序依赖项
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 拷贝应用代码
COPY . .

# 构建 Next.js 项目
RUN pnpm run build

# 开放端口 - 使用一个不常用的端口，比如 4000
EXPOSE 4000

# 设置启动命令，使用 Next.js 的生产启动命令
CMD [ "pnpm", "run", "start" ]