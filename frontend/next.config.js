/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  }
};
const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  nextConfig,
};