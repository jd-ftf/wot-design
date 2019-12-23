const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const config = require('./config')

const isDev = process.env.NODE_ENV === 'development'

const cssLoader = (...loaders) => {
  const formatLoaders = []
  formatLoaders.push('vue-style-loader')
  
  if (!isDev) {
    formatLoaders.push({
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../../'
      }
    })
  }
  loaders.forEach(loader => {
    formatLoaders.push({
      loader: loader,
      options: {
        sourceMap: isDev
      }
    })
  })

  return formatLoaders
}

const resolve = dir => {
  return path.join(__dirname, '..', dir)
}

const assetsPath = file => {
  return path.posix.join('static', file)
}

let webpackConf = {
  mode: isDev ? 'development' : 'production',
  context: path.resolve(__dirname, '../'),
  entry: {
    demo: './examples/demo/main.js',
    docs: './examples/docs/main.js'
  },
  output: {
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('packages'), resolve('test')],
        options: {
          formatter: require('eslint-formatter-friendly'),
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
        use: cssLoader('css-loader', 'postcss-loader')
      },
      {
        test: /\.scss$/,
        use: cssLoader('css-loader', 'postcss-loader', 'sass-loader')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: assetsPath('img/[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : false,
  resolve: {
    extensions: ['.js', '.vue', '.json', '.md'],
    alias: config.alias
  },
  stats: {
    children: false,
    modules: false,
    entrypoints: false
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /\/docs/, to: '/docs.html' },
        { from: /\/demo/, to: '/demo.html' },
      ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: '0.0.0.0',
    port: 8075,
    overlay: {
      warnings: false,
      errors: true
    },
    quiet: true,
    disableHostCheck: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'dev' : 'prod')
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: isDev ? 'demo.html' : path.resolve(__dirname, '../examples/dist/demo.html'),
      template: path.resolve(__dirname, '../examples/demo/index.html'),
      chunks: ['demo'],
      favicon: path.resolve(__dirname, '../examples/demo/favicon.ico')
    }),
    new HtmlWebpackPlugin({
      filename: isDev ? 'docs.html' : path.resolve(__dirname, '../examples/dist/docs.html'),
      template: path.resolve(__dirname, '../examples/docs/index.html'),
      chunks: ['docs'],
      favicon: path.resolve(__dirname, '../examples/docs/favicon.ico')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        // demo 路径和 docs 入口
        messages: [
`App running at:
  
  - Docs: http://0.0.0.0:8075/docs
  - Mobile demo: http://0.0.0.0:8075/demo
  
`]}})
  ]
}

if (!isDev) {
  webpackConf = merge(webpackConf, {
    output: {
      publicPath: './',
      path: path.resolve(__dirname, '../examples/dist'),
      filename: assetsPath('js/[name].[hash].js'),
      chunkFilename: assetsPath('js/[id].[hash].js')
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
        filename: assetsPath('css/[name].[contenthash:8].css'),
        chunkFilename: assetsPath('css/[name].[contenthash:8].css')
      })
    ]
  })
}

module.exports = webpackConf
