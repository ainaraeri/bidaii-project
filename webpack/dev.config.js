const path = require('path');


const env = require('../env');
const proxyRules = require('../proxy/rules');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const webpackCommon = require('./common.config');

module.exports = merge(webpackCommon, {
  devtool: "inline-source-map",
  mode: "development",
  entry: {
    app: "./src/bootstrap.js", // Ruta relativa a tu carpeta raíz
  },
  output: { //NO TOCAR
    path: path.resolve(__dirname, "webpack/webpack/public/js"), // Asegúrate de que coincida con la ubicación donde se guarda bootstrap.js
    filename: "[name].js",
    sourceMapFilename: "[name].map",
    chunkFilename: "[id]-chunk.js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              outputStyle: "expanded",
              sourceMap: true,
              sourceMapContents: true,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/videos/[name].[ext]",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: "'development'",
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "../static/index.html"),
      favicon: path.resolve(__dirname, "../static/favicon.ico"),
    }),
    new HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/bootstrap.js", to: "js" },
        { from: "static/assets/images", to: "assets/images" },
      ],
    }),
  ],

  devServer: {
    host: env.devServer.host || "localhost",
    port: env.devServer.port || 3000,
    compress: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    client: {
      overlay: true,
    },
    proxy: proxyRules,
  },
});
