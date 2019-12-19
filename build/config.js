const path = require('path')
const fs = require('fs')
const components = require('../components')

const utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'))
const mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'))

const externals = {
  vue: 'vue'
}

Object.keys(components).forEach(component => {
  externals[`jm-design/packages/${key}`] = `jm-design/lib/${components}`
})
utilsList.forEach(util => {
  externals[`jm-design/src/utils/${util}`] = `jm-design/lib/utils/${util}`
})
mixinsList.forEach(mixin => {
  externals[`jm-design/mixins/${mixin}`] = `jm-design/lib/mixins/${mixin}`
})
