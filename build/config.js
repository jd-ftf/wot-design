const path = require('path')
const fs = require('fs')
const components = require('../components')

const utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'))
const mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'))

const externals = {
  vue: 'vue',
  'jm-design/src/mixins/locale': '@jd/jm-design/lib/mixins/locale'
}

Object.keys(components).forEach(component => {
  externals[`jm-design/packages/${component}`] = `@jd/jm-design/lib/${component}`
})
utilsList.forEach(util => {
  externals[`jm-design/src/utils/${util}`] = `@jd/jm-design/lib/utils/${util}`
})
mixinsList.forEach(mixin => {
  externals[`jm-design/src/mixins/${mixin}`] = `@jd/jm-design/lib/mixins/${mixin}`
})

exports.externals = externals

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  'jm-design': path.resolve(__dirname, '../')
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}
