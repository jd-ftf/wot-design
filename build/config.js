'use strict'

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true,
    demoPath: 'http://localhost:8080/examples#'          // demo 根地址
  },

  docs: {
    examples: path.resolve(__dirname, '../docs-dist/examples.html'),
    docs: path.resolve(__dirname, '../docs-dist/docs.html'),
    assetsRoot: path.resolve(__dirname, '../docs-dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    demoPath: 'http://jm-assist.jd.com/jmdesign/examples.html#'          // demo 根地址
  },

  build: {
    assetsRoot: path.resolve(__dirname, '../lib'),
    assetsSubDirectory: './',
    devtool: '#source-map',
    productionSourceMap: false
    
  }
}
