'use strict'
process.env.NODE_ENV = 'production'

const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for JM Design lib...')
spinner.start()

webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Lib build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Lib build complete.\n'))
})