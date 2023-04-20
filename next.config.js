/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: "export",
  distDir: "build",
};

module.exports = nextConfig;
