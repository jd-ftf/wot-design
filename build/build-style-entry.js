const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const components = require('../components.json')

console.log(chalk.cyan('Create the entry of component\'s css file...'))
Object.keys(components).forEach(component => {
  let entryPath = path.resolve(__dirname, `../lib/${component}/style`)
  if (!fs.existsSync(entryPath)) {
    fs.mkdirSync(entryPath)
  }
  fs.writeFileSync(`${entryPath}/index.js`, `import '../../theme-default/${component}.css'`)
})
console.log(chalk.cyan('Create finish.'))
