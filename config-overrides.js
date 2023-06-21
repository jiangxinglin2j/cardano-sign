const webpack = require('webpack')
// const WebpackBar = require('webpackbar')
const { override, addWebpackPlugin, addWebpackAlias, addWebpackResolve } = require('customize-cra')
const path = require('path')

const addBufferPlugin = config => {
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  );
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  )
  return config;
}

const ignoreWarnings = value => config => {
  config.ignoreWarnings = value;
  return config;
};

module.exports = {
 webpack: override(
   addWebpackAlias({
     '@': path.resolve(__dirname, './src')
   }),
   addBufferPlugin,
   addWebpackPlugin(new webpack.ProgressPlugin()),
  //  addLessLoader({
  //    lessOptions: {
  //     localIdentName: '[local]--[hash:base64:5]'
  //   }
  //   }),
  //   adjustStyleLoaders(({ use: [, , postcss] }) => {
  //    const postcssOptions = postcss.options;
  //    postcss.options = { postcssOptions };
  //  })
  addWebpackResolve({
    extensions: [ '.ts', '.js' ],
    fallback: {
      'fs': false,
      'stream': require.resolve('stream-browserify'),
      'assert': require.resolve('assert'),
      'crypto': require.resolve('crypto-browserify'),
      'querystring': require.resolve('querystring'),
      'constants': require.resolve('constants'),
      'buffer': require.resolve('buffer')
    }
  }),
  ignoreWarnings([/Failed to parse source map/])
 )
}
