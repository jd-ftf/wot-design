'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  // 多入口配置，examples 是 H5 格式的组件例子，docs 是 API 文档
  entry: {
    examples: './examples-m/main.js',
    docs: './examples/main.js'
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  devtool: config.dev.devtool,

  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /\/docs/, to: path.posix.join(config.dev.assetsPublicPath, 'docs.html') },
        { from: /\/examples/, to: path.posix.join(config.dev.assetsPublicPath, 'examples.html') },
      ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // examples 入口使用的 HTML 模板
    new HtmlWebpackPlugin({
      filename: 'examples.html',
      template: 'examples-m/index.html',
      chunks: ['examples'],
      inject: true
    }),
    // docs 入口使用的 HTML 模板
    new HtmlWebpackPlugin({
      filename: 'docs.html',
      template: 'examples/index.html',
      chunks: ['docs'],
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port

      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          // 页面入口，examples 路径和 docs 入口
          messages: [`Docs is running here: http://${devWebpackConfig.devServer.host}:${port}/docs` +
            `, examples is running here: http://${devWebpackConfig.devServer.host}:${port}/examples`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
