const fs = require('fs')
const path = require('path')
const babel = require('@babel/core')
const chalk = require('chalk')

const localePath = path.resolve(__dirname, '../src/locale/lang')
const fileList = fs.readdirSync(localePath)

fileList.filter(file => {
  return /\.js$/.test(file)
}).forEach(file => {
  let name = path.basename(file, '.js')

  babel.transformFile(path.resolve(localePath, file), {
    plugins: [
      'add-module-exports',
      ['transform-es2015-modules-umd', {loose: true}]
    ],
    moduleId: name
  }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      let code = result.code
      .replace('define("', 'define("jmd/locale/')
      .replace('global.', 'global.JMD.lang = global.JMD.lang || {}; \n    global.JMD.lang.')
      saveFile(path.resolve(__dirname, '../lib/umd/locale'), file, code)
    }
  })
})

console.log(chalk.green('locale umd file built.'))

function saveFile (dirname, filename, content) {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true })
  }
  fs.writeFileSync(path.resolve(dirname, filename), content)
}
