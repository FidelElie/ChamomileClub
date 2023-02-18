/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "@thechamomileclub/database"
  ]
}

module.exports = nextConfig
