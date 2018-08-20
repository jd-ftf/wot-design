/**
 * 引入所有样式文件，用于开发者进行主题自定义
 */
const path = require('path')
const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const components = require('../components.json')

const spinner = ora('Mix all scss into index.scss...')
spinner.start()

const basePath = path.resolve(__dirname, '../src/style')

let indexContent = '@import "base.scss";\n'

const isFileExit = filepath => {
  try {
    return fs.statSync(filepath).isFile()
  } catch(err) {
    return false
  }
}

Object.keys(components).forEach(key => {
  indexContent += `@import "./components/${key}.scss";\n`
  let filepath = path.resolve(basePath, 'components', `${key}.scss`)
  
  if (!isFileExit(filepath)) {
    fs.writeFileSync(filepath, '', 'utf-8')
    console.log(chalk.yellow(`创建遗漏的${key}.scss文件`))
  }
})

try {
  fs.writeFileSync(path.resolve(basePath, 'index.scss'), indexContent)
  spinner.stop()
  console.log(chalk.cyan(' Scss mix complete.\n'))
} catch(err) {
  console.log(chalk.red('  Scss mix failed with errors.\n'))
}