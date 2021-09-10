module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    API_URI_BASE: process.env.API_URI_BASE,
    API_URI_REFRESH_TOKEN: process.env.API_URI_REFRESH_TOKEN
  }
}
