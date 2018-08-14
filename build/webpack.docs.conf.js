/**
 * docs文档和examples打包配置
 */
'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    examples: './examples-m/main.js',
    docs: './examples/main.js'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.docs.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.docs.productionSourceMap ? config.docs.devtool : false,
  output: {
    path: config.docs.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV === 'testing' ? '"testing"' : '"document"'
      }
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.docs.productionSourceMap,
      parallel: true
    }),
    // 将 css 样式整合进一个 css 文件，多入口的话是针对每个入口单独抽离出 css 样式，生成对应的文件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.docs.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // 自动生成 examples 的静态页面，以 examples/index.html 为模板，examples 的 chunk 文件自动插入 html 文件
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'examples.html'
        : config.docs.examples,
      template: 'examples-m/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['vendor', 'manifest-examples', 'examples'],
      chunksSortMode: 'dependency'
    }),
    // 自动生成 docs 的静态页面，以 docs/index.html 为模板，docs 的 chunk 文件自动插入 html 文件
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'docs.html'
        : config.docs.docs,
      template: 'examples/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      chunks: ['vendor', 'manifest-docs', 'docs'],
      chunksSortMode: 'dependency'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest-examples',
      minChunks: Infinity,
      chunks: ['examples']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest-docs',
      minChunks: Infinity,
      chunks: ['docs']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app-examples',
      async: 'vendor-async',
      minChunks: 3,
      chunks: ['examples']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app-docs',
      async: 'vendor-async',
      minChunks: 3,
      chunks: ['docs']
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.docs.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = webpackConfig
