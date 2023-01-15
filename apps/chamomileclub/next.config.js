/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    "@chmamomileclub/casinojs",
    "@chamomoleclub/api"
  ],
  rewrites: () => [
    {
      source: "/api",
      destination: process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://api.thechamomileclub.com"
    }
  ],
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack')
    })
    return config
  }
}
