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
    examples: './examples-m/main.js',
    docs: './examples/main.js'
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
        { from: /\/examples/, to: '/examples.html' },
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
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        // 页面入口，examples 路径和 docs 入口
        messages: [
`App running at:
  
  - Docs: http://0.0.0.0:8075/docs
  - Mobile examples: http://0.0.0.0:8075/examples
  
`]}})
  ]
}

if (!isDev) {
  webpackConf = merge(webpackConf, {
    output: {
      publicPath: './',
      path: path.resolve(__dirname, '../docs'),
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
