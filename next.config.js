// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const purgecss = require('@fullhuman/postcss-purgecss')

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        scrollRestoration: true,
    
          optimizeFonts: true,
     
      },
      images: {
        deviceSizes: [320, 400, 480, 560, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      },
      compression: true,
      optimization: {
        usedExports: true,  // Enable tree shaking by marking unused exports
        minimize: true,     // Enable minification to further reduce bundle size
        experimental: {
          optimizeCss: true,
        },
      }, plugins: [
        purgecss({
          content: ['./**/*.html']
        })
      ]

}

module.exports = nextConfig


// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

// module.exports = withBundleAnalyzer({
//   reactStrictMode: true,
// })