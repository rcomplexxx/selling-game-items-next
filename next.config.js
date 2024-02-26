const TerserPlugin = require('terser-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        scrollRestoration: true,
      },
      compression: true,
      optimization: {
        usedExports: true,  // Enable tree shaking by marking unused exports
        minimize: true,     // Enable minification to further reduce bundle size
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,          // Remove console.* statements
                drop_debugger: true,         // Remove debugger statements
                unused: true,                // Drop unreferenced functions and variables
                dead_code: true,             // Remove unreachable code
                warnings: false,             // Disable warnings
                inline: 2,                   // Inline functions with 2 calls or less
                keep_fargs: false,           // Drop unused function arguments
              },
              mangle: {
                reserved: ['list', 'of', 'variable', 'names'],  // Prevent renaming of specific variables
              },
              output: {
                comments: false,             // Remove comments
              },
            },
          }),
        ],
      },
}

module.exports = nextConfig
