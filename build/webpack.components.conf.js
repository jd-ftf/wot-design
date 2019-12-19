const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const components = require('../components.json')
const path = require('path')
const utils = require('./utils')
const { VueLoaderPlugin } = require('vue-loader')
const config = require('./config')

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '../'),
  entry: components,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name]/index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: 'img/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  externals: config.externals,
  resolve: {
    extensions: ['.js', '.vue'],
    alias: config.alias
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new VueLoaderPlugin()
  ],
  stats: {
    children: false,
    modules: false,
    entrypoints: false
  }
}
