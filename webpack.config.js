const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: process.env === 'production' ? 'production': 'development',
  entry: {
    main: './src/main',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  optimization: {
    minimizer: []
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
            loader: 'postcss-loader',
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
    new CleanWebpackPlugin(),
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
  ]);

  module.exports.optimization.minimizer = (module.exports.optimization.minimizer || []).concat([
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
    }),
  ])
}
