module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['chatsmanapi.herokuapp.com'],
  },
  env: {
    // PROD
    API_URI_BASE: process.env.API_URI_BASE,
    API_URI_REFRESH_TOKEN: process.env.API_URI_REFRESH_TOKEN,
    API_URI_IMAGE_UPLOAD: process.env.API_URI_IMAGE_UPLOAD
    // FOR DEV
    // API_URI_BASE: process.env.API_URI_BASE_TEMP,
    // API_URI_REFRESH_TOKEN: process.env.API_URI_REFRESH_TOKEN_TEMP,
    // API_URI_IMAGE_UPLOAD: process.env.API_URI_IMAGE_UPLOAD_TEMP
  }
}
