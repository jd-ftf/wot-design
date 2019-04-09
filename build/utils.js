const path = require('path')
const packageConfig = require('../package.json')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

exports.cssLoader = (...loaders) => {
  const formatLoaders = []
  formatLoaders.push('vue-style-loader')
  
  if (!isDev) {
    formatLoaders.push(MiniCssExtractPlugin.loader)
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

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.resolve = dir => {
  return path.join(__dirname, '..', dir)
}
