'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const path = require('path')

const devWebpackConfig = merge(baseWebpackConfig, {
  // 多入口配置，examples 是 H5 格式的组件例子，docs 是 API 文档
  mode: 'development',
  entry: {
    examples: './examples-m/main.js',
    docs: './examples/main.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: 'img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /\/docs/, to: '/docs.html' },
        { from: /\/examples/, to: '/examples.html' },
      ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: '0.0.0.0',
    port: 8090,
    overlay: {
      warnings: false,
      errors: true
    },
    quiet: true,
    disableHostCheck: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    // examples 入口使用的 HTML 模板
    new HtmlWebpackPlugin({
      filename: 'examples.html',
      template: path.resolve(__dirname, '../examples-m/index.html'),
      chunks: ['examples']
    }),
    // docs 入口使用的 HTML 模板
    new HtmlWebpackPlugin({
      filename: 'docs.html',
      template: path.resolve(__dirname, '../examples/index.html'),
      chunks: ['docs']
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = 8090
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port

      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          // 页面入口，examples 路径和 docs 入口
          messages: [
  `App running at:
    
    - Docs: http://${devWebpackConfig.devServer.host}:${port}/docs
    - Mobile examples: http://${devWebpackConfig.devServer.host}:${port}/examples
    
  `],
        },
        onErrors: utils.createNotifierCallback()
      }))

      resolve(devWebpackConfig)
    }
  })
})
