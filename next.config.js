/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/nestapi/:path*',
        destination: 'http://localhost:3030/api/:path*' // 指向您的 NestJS 服务器
      }
    ]
  },
}

module.exports = nextConfig
