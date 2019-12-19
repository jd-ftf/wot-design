const fs = require('fs')
const path = require('path')
const version = require('../package').version

const content = {
  '0.7.0': '0.7'
}
if (!content[version]) {
  content[version] = '0.7'
}
fs.writeFileSync(path.resolve(__dirname, '../examples/versions.json'), JSON.stringify(content))