/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,

  // TODO: below line is added to resolve twice event dispatch in the calendar reducer
  reactStrictMode: false,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
        locale: false
      }
    ]
  }
}

module.exports = nextConfig
