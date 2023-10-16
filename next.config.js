/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // ignoreDuringBuilds: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  i18n: {
    locales: ["en_US", "zh_CN", "zh_TW"],
    defaultLocale: "en_US",
  },
};

module.exports = nextConfig;
