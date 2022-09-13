const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const projectRoot = process.cwd();

const devCnofig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(projectRoot, './dist'),
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
  },
};

module.exports = merge(baseConfig, devCnofig);
