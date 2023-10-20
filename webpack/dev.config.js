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
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../static/dist'), // Coloca los archivos generados en /static/dist
    filename: 'js/[name].js', // Coloca los archivos en la carpeta /static/dist/js
    sourceMapFilename: 'js/[name].map',
    chunkFilename: 'js/[id]-chunk.js',
    publicPath: '/' // Puedes ajustar esto según tus necesidades
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }      
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../static/index.html'),
      favicon: path.resolve(__dirname, '../static/favicon.ico')
    }),
    new HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/bootstrap.js', to: 'js' }
      ],
    }),
    
  ],

  devServer: {
    host: env.devServer.host || 'localhost',
    port: env.devServer.port || 3000,
    compress: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    },
    client: {
      overlay: true,
    },
    proxy: proxyRules
  }, 

});
