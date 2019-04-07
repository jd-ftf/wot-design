'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('./config')
const vueLoaderConfig = require('./vue-loader.conf')
const MarkdownItContainer = require('markdown-it-container')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// ESLint 检测的目录，对 js 文件和 vue 文件检测，不对 markdown 文件检测
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('packages'), resolve('examples'), resolve('examples-m')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

const vueMarkdownOptions = {
  use: [ MarkdownItContainer ],
  preventExtract: true
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV === 'production'
    ? config.build.assetsPublicPath
    : (process.env.NODE_ENV === 'document' ? config.docs.assetsPublicPath : config.dev.assetsPublicPath)
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.md'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jm-design': resolve('packages')     // 使用 jm-design 引入 packages 里的组件
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        include: [resolve('examples/docs')],
        options: vueMarkdownOptions
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('packages'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
