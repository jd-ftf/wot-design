const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const components = require('../components.json')
const path = require('path')
const utils = require('./utils')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '../'),
  entry: components,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: ({ chunk }) => {
      let returnName = chunk.name.replace(/([A-Z])/g, ($1, $2) => {
        return '-' + $2
      })

      return `${returnName}/index.js`
    },
    library: ['JMDesign', '[name]'],
    libraryTarget: 'umd'
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
      }
    ]
  },
  externals: {
    vue: 'vue'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
      'jm-design': utils.resolve('packages')
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      })
    ],
    splitChunks: {}
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new VueLoaderPlugin()
  ],
  stats: {
    children: false,
    modules: false,
    entrypoints: false
  }
}
