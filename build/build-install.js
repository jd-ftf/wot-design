const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const version = require('../package').version

const tplPath = path.resolve(__dirname, '../examples/docs/template/install.handlebars')
const tpl = fs.readFileSync(tplPath, 'utf-8')
const template = Handlebars.compile(tpl)
const result = template({
  version
})

const toPath = path.resolve(__dirname, '../examples/docs/docs/install.md')

fs.writeFileSync(toPath, result, 'utf-8')
