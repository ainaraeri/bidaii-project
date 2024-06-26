const path = require("path");
const webpack = require("webpack");
const { merge } = require('webpack-merge');
const autoprefixer = require("autoprefixer");
const webpackCommon = require("./common.config");

// webpack plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = merge(webpackCommon, {
  bail: true,
  devtool: 'source-map',
  entry: {
    app: './src/bootstrap.js',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'webpack/public'),
    filename: '[name]-[hash].min.js',
    sourceMapFilename: '[name]-[hash].map',
    chunkFilename: '[id]-[chunkhash].js',
    publicPath: '/'
  },  

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "../static/index.html"),
      favicon: path.resolve(__dirname, "../static/favicon.ico"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[chunkhash].min.css',
    }),
    new TerserPlugin({
      terserOptions: {
        compress: { ie8: true, warnings: false },
        mangle: { ie8: true },
        output: { comments: false, ie8: true },
      },
      extractComments: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/bootstrap.js', to: 'js' },
        { from: 'static/assets/images', to: 'assets/images' },
      ],
    }),
  ],
});