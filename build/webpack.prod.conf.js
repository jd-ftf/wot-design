'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  entry: {
    index: './src/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    library: 'JMDesign',
    libraryTarget: 'umd'
  },
  externals: {
    vue: 'vue'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV === 'testing' ? '"testing"' : '"production"'
      }
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new ExtractTextPlugin({
      filename: 'theme-default/[name].css',
      allChunks: true,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
})

module.exports = webpackConfig
