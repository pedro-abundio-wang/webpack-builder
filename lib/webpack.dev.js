const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.base');

const projectRoot = process.cwd();

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(projectRoot, './dist'),
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
  },
};

module.exports = merge(baseConfig, devConfig);
