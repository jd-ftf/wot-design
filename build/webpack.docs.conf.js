const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const utils = require('./utils')
const { VueLoaderPlugin } = require('vue-loader')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
let outputConfig

const webpackConf = {
  mode: isDev ? 'development' : 'production',
  context: path.resolve(__dirname, '../'),
  entry: {
    examples: './examples-m/main.js',
    docs: './examples/main.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [utils.resolve('src'), utils.resolve('packages'), utils.resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: utils.cssLoader('css-loader', 'postcss-loader')
      },
      {
        test: /\.scss$/,
        use: utils.cssLoader('css-loader', 'postcss-loader', 'sass-loader')
      },
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
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : false,
  resolve: {
    extensions: ['.js', '.vue', '.json', '.md'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
      'jm-design': utils.resolve('packages')
    }
  },
  stats: {
    children: false,
    modules: false,
    entrypoints: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'dev' : 'prod')
    }),
    new VueLoaderPlugin()
  ]
}

if (isDev) {
  let devWebpackConf = merge(webpackConf, {
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
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: 'examples.html',
        template: path.resolve(__dirname, '../examples-m/index.html'),
        chunks: ['examples'],
        favicon: path.resolve(__dirname, '../examples-m/favicon.ico')
      }),
      new HtmlWebpackPlugin({
        filename: 'docs.html',
        template: path.resolve(__dirname, '../examples/index.html'),
        chunks: ['docs'],
        favicon: path.resolve(__dirname, '../examples/favicon.ico')
      })
    ]
  })
  outputConfig = new Promise((resolve, reject) => {
    portfinder.basePort = 8090
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        process.env.PORT = port
        devWebpackConf.devServer.port = port
  
        devWebpackConf.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            // 页面入口，examples 路径和 docs 入口
            messages: [
    `App running at:
      
      - Docs: http://${devWebpackConf.devServer.host}:${port}/docs
      - Mobile examples: http://${devWebpackConf.devServer.host}:${port}/examples
      
    `],
          },
          onErrors: utils.createNotifierCallback()
        }))
  
        resolve(devWebpackConf)
      }
    })
  })
} else {
  outputConfig = merge(webpackConf, {
    output: {
      publicPath: './',
      path: path.resolve(__dirname, '../docs'),
      filename: 'js/[name].[chunkhash].js',
      chunkFilename: 'js/[id].[chunkhash].js'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin()
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].css'
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../docs/examples.html'),
        template: 'examples-m/index.html',
        chunks: ['examples']
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../docs/docs.html'),
        template: 'examples/index.html',
        chunks: ['docs']
      })
    ]
  })
}

module.exports = outputConfig
