const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const jsFiles = glob.sync(path.resolve(projectRoot, 'src/*/index.js'));
  const jsxFiles = glob.sync(path.resolve(projectRoot, 'src/*/index.jsx'));
  const entryFiles = jsFiles.concat(jsxFiles);
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const regEx = /src\/(?<pageName>\w*)\/index.js/;
    const { pageName } = entryFile.match(regEx).groups;
    entry[pageName] = entryFile;
    return htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(projectRoot, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [pageName],
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
        // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1.0">
        'Content-Security-Policy': { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        // Will generate: <meta http-equiv="X-UA-Compatible" content="IE=edge">
      },
    }));
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.resolve(projectRoot, 'dist'),
    clean: true,
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: 'node_modules',
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        exclude: 'node_modules',
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        exclude: 'node_modules',
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: 'node_modules',
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: 'node_modules',
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: 'node_modules',
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new ESLintPlugin(),
  ].concat(htmlWebpackPlugins),
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
