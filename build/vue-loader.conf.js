'use strict'
const utils = require('./utils')
const config = require('./config')
const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'document'
const sourceMapEnabled = process.env.NODE_ENV === 'production'
  ? config.build.productionSourceMap
  : (process.env.NODE_ENV === 'document' ? config.docs.productionSourceMap : config.dev.cssSourceMap)

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
