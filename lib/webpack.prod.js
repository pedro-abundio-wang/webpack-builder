const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  optimization: {
    minimizer: [
      // extend default minimizer, i.e. `terser-webpack-plugin` for JS
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};

module.exports = merge(baseConfig, prodConfig);
