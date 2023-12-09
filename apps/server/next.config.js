const packageJSON = require("./package.json");

const externalIdentifiers = "@thechamomileclub";

const transpilePackages = Object.keys(packageJSON.dependencies).filter(
  (dependency) => dependency.includes(externalIdentifiers),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  transpilePackages,
};

module.exports = nextConfig;
