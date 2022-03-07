const path = require('path');
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['chatsmanapi.herokuapp.com', 'storage.googleapis.com', "res.cloudinary.com"],
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/home',
    runtimeCaching,
    sw: 'service-worker.js',
  },
  swcMinify: true,
  env: {
    API_URI_BASE: process.env.API_URI_BASE,
    API_URI_SUBSCRIPTION: process.env.API_URI_SUBSCRIPTION,
    API_URI_REFRESH_TOKEN: process.env.API_URI_REFRESH_TOKEN,
    API_URI_IMAGE_UPLOAD: process.env.API_URI_IMAGE_UPLOAD,
    API_URI_BACKGROUND_UPLOAD: process.env.API_URI_BACKGROUND_UPLOAD,
    API_URI_CONV_IMAGE_UPLOAD: process.env.API_URI_CONV_IMAGE_UPLOAD,
    TEST_USER_EMAIL: process.env.TEST_USER_EMAIL,
    TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD,
    TEST_USER_SECRET: process.env.TEST_USER_SECRET
  },

  // This is not required to make it into a PWA, but is a nice way to clean up your imports
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./'));
    return config;
  }
})