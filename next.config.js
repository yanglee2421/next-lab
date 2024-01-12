/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  webpack(config) {
    Object.assign(config.resolve.alias, {
      apexcharts: path.resolve(
        __dirname,
        "./node_modules/apexcharts-clevision"
      ),
      "@": path.resolve(__dirname, "./src"),
    });

    return config;
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  rewrites() {
    return [
      // {
      //   source: "/wd/:slug*",
      //   destination: `${process.env.NEXT_PUBLIC_WARP_BASEURL}/wd/:slug*`,
      // },
    ];
  },
  i18n: {
    defaultLocale: "en_US",
    locales: ["en_US", "zh_CN"],
  },
};
