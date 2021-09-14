module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['chatsmanapi.herokuapp.com'],
  },
  env: {
    API_URI_BASE: typeof window !== undefined ? process.env.API_URI_BASE_TEMP : process.env.API_URI_BASE,
    API_URI_REFRESH_TOKEN: typeof window !== undefined ? process.env.API_URI_REFRESH_TOKEN_TEMP : process.env.API_URI_REFRESH_TOKEN,
    API_URI_IMAGE_UPLOAD: typeof window !== undefined ? process.env.API_URI_IMAGE_UPLOAD_TEMP : process.env.API_URI_IMAGE_UPLOAD
  }
}
