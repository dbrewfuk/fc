const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const NotifierPlugin = require('webpack-notifier');
const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssCssnext = require('postcss-cssnext');
const postcssInlineSvg = require('postcss-inline-svg');
// const S3Plugin = require('webpack-s3-plugin');

module.exports = {
  entry: {
    main: './src/main',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html',
              outputPath: '../',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              conservativeCollapse: false,
              removeAttributeQuotes: false,
            },
          },
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: [
                path.resolve(__dirname, 'src/html'),
                path.resolve(__dirname, 'img'),
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/css'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].min.css',
              outputPath: '../css/',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: (process.env.NODE_ENV) === 'production',
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssImport(),
                postcssMixins(),
                postcssCssnext(),
                postcssInlineSvg({
                  path: path.resolve(__dirname, 'img'),
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
				corejs: '3.0.1',
              }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanPlugin(['dist']),
    new BrowserSyncPlugin({
      files: [
        'dist/**/*',
      ],
      server: 'dist',
    }, {
      reload: false,
    }),
  ],
  watch: process.env.NODE_ENV !== 'production',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      cache: true,
      parallel: true,
    }),
  ]);
}
