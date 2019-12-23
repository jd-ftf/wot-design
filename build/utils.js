const path = require('path')
const packageConfig = require('../package.json')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

exports.cssLoader = (...loaders) => {
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

exports.resolve = dir => {
  return path.join(__dirname, '..', dir)
}

exports.assetsPath = file => {
  return path.posix.join('static', file)
}
