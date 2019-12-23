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
      ['@babel/plugin-transform-modules-umd', {
        loose: true
      }]
    ],
    moduleId: name
  }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      let code = result.code
      .replace('define("', 'define("WotDesign/locale/')
      .replace('global.', 'global.WotDesign.lang = global.WotDesign.lang || {}; \n    global.WotDesign.lang.')
      .replace('mod.exports;', 'mod.exports.default;')
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
