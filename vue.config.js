const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'muni-virtual',
    short_name: "muni-virtual",
    themeColor: '#4DBA87',
    msTileColor: '#4DBA87',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#4DBA87'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
