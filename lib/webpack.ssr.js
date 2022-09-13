const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const ssrConfig = {
  mode: 'production',
};

module.exports = merge(baseConfig, ssrConfig);
