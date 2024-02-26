// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//         scrollRestoration: true,
//       },
//       compression: true,
//       optimization: {
//         usedExports: true,  // Enable tree shaking by marking unused exports
//         minimize: true,     // Enable minification to further reduce bundle size
//         experimental: {
//           optimizeCss: true,
//         },
//       },

//       plugins: [
//         new BundleAnalyzerPlugin()
//       ]

// }

// module.exports = nextConfig


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
})