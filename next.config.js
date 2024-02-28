const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const withCompression = require('next-compress')();
const purgecss = require('@fullhuman/postcss-purgecss')

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        scrollRestoration: true,
    
          optimizeFonts: true,
     
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