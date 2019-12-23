const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const packageConfig = require('../package')
const config = require('./config')

const banner = `${packageConfig.name} v${packageConfig.version} | (c) ${new Date().getFullYear()} by ftf`

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '../'),
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    library: 'JMDesign',
    libraryTarget: 'umd',
    libraryExport: 'default'
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
  externals: {
    vue: config.vue
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: config.alias
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: new RegExp(packageConfig.name, 'i'),
          }
        }
      })
    ],
    splitChunks: {}
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new VueLoaderPlugin(),
    new webpack.BannerPlugin(banner)
  ],
  stats: {
    children: false,
    modules: false,
    entrypoints: false
  }
}
