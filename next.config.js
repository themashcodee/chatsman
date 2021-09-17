const path = require('path');
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache');

const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['chatsmanapi.herokuapp.com'],
  },
  pwa: {
    dest: 'public',
    register: prod ? false : true,
    scope: '/home',
    runtimeCaching,
    sw: 'service-worker.js',
  },
  env: {
    API_URI_BASE: process.env.API_URI_BASE,
    API_URI_SUBSCRIPTION: process.env.API_URI_SUBSCRIPTION,
    API_URI_REFRESH_TOKEN: process.env.API_URI_REFRESH_TOKEN,
    API_URI_IMAGE_UPLOAD: process.env.API_URI_IMAGE_UPLOAD
  },

  // This is not required to make it into a PWA, but is a nice way to clean up your imports
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./'));
    return config;
  }
})