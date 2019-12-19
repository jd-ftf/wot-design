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
          name: utils.assetsPath('img/[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : false,
  resolve: {
    extensions: ['.js', '.vue', '.json', '.md'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'main': utils.resolve('src'),
      'jm-design': utils.resolve('/')
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
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: isDev ? 'examples.html' : path.resolve(__dirname, '../docs/examples.html'),
      template: path.resolve(__dirname, '../examples-m/index.html'),
      chunks: ['examples'],
      favicon: path.resolve(__dirname, '../examples-m/favicon.ico')
    }),
    new HtmlWebpackPlugin({
      filename: isDev ? 'docs.html' : path.resolve(__dirname, '../docs/docs.html'),
      template: path.resolve(__dirname, '../examples/index.html'),
      chunks: ['docs'],
      favicon: path.resolve(__dirname, '../examples/favicon.ico')
    })
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
      new webpack.HotModuleReplacementPlugin()
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
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new OptimizeCSSAssetsPlugin()
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/[name].[contenthash:8].css'),
        chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
      })
    ]
  })
}

module.exports = outputConfig
