const path = require("path");
const webpack = require("webpack");
const { merge } = require('webpack-merge');
const autoprefixer = require("autoprefixer");
const webpackCommon = require("./common.config");

// webpack plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(webpackCommon, {
  bail: true,
  entry: ["/Users/ainara/Desktop/proyectos-programacion/code/bidaii-project/src/bootstrap.js"],
  devtool: "source-map",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name]-[hash].min.js",
    sourceMapFilename: "[name]-[hash].map",
    chunkFilename: "[id]-[chunkhash].js",
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // Agregado para procesar archivos CSS
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
                plugins: [autoprefixer]
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
    ],
    

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "../src/bootstrap.js"),
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
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[chunkhash].min.css',
    }),
    new TerserPlugin({
      terserOptions: {
        compress: { ie8: true, warnings: false },
        mangle: { ie8: true },
        output: { comments: false, ie8: true }
      },
      extractComments: false 
    })
  ],
}});