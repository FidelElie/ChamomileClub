/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "@athechamomileclub/api"
  ],
  rewrites : () => {
    return [
      {
        source: "/api",
        destination: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://api.thechamomileclub.com"
      }
    ]
  }
}

module.exports = nextConfig
