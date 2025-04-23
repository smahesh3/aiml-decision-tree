/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@react-pdf/renderer'],
  output: 'export',
  distDir: 'out',
};

module.exports = nextConfig; 