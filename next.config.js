// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const purgecss = require('@fullhuman/postcss-purgecss')

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        scrollRestoration: true,
    
          optimizeFonts: true,
     
      },
      images: {
        deviceSizes: [320, 360, 400, 440, 480, 520, 560, 600, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      },
      i18n: {
        locales: ['en'],
        defaultLocale: 'en',
      },
  

}

module.exports = {
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Find the TerserPlugin in the minimizer array
      for (const plugin of config.optimization.minimizer) {
        if (plugin.constructor.name === 'TerserPlugin') {
          // Customize Terser options
          plugin.options.terserOptions = {
            // Enable ES6+ transformations
            ecma: 2015,
            // Preserve function names
            mangle: {
              keep_fnames: false,
            },
            // Additional optimizations
            compress: {
              // Remove console.* statements
              drop_console: true,
              // Optimize numerical expressions
              unsafe_math: true,
              // Inline simple functions
              inline: 3,
              // Join consecutive var, let, and const statements
              join_vars: true,
            },
            // Preserve class names
            keep_classnames: false,
            // Evaluate constant expressions
            evaluate: true,
            // Preserve completion values from terminal statements
            expression: true,
            // Hoist function declarations
            hoist_funs: true,
            // Hoist properties from constant object and array literals
            hoist_props: true,
          };
        }
      }
    }
    return  {...config, ...nextConfig};
  }
  
 }


// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

// module.exports = withBundleAnalyzer({
//   reactStrictMode: true,
// })