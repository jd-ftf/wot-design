const fs = require('fs')
const path = require('path')
const version = require('../package').version

const content = {
  '1.0.1': '1.0',
  '1.1.0': '1.1'
}
if (!content[version]) {
  content[version] = '1.0'
}
fs.writeFileSync(path.resolve(__dirname, '../examples/docs/versions.json'), JSON.stringify(content))