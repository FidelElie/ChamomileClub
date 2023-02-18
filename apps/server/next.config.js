/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  transpilePackages: [
    "@thechamomileclub/database"
  ]
}

module.exports = nextConfig
