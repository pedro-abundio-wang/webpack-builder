const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};

module.exports = merge(baseConfig, prodConfig);
