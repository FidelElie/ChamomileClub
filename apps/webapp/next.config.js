/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "@athechamomileclub/api"
  ]
}

module.exports = nextConfig
