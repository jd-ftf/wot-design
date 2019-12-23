const path = require('path')
const fs = require('fs')
const libName = require('../package').name
const components = require('../components')

const utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'))
const mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'))

const externals = {
  vue: 'vue',
  [`${libName}/src/mixins/locale`]: `${libName}/lib/mixins/locale`
}

Object.keys(components).forEach(component => {
  externals[`${libName}/packages/${component}`] = `${libName}/lib/${component}`
})
utilsList.forEach(util => {
  externals[`${libName}/src/utils/${util}`] = `${libName}/lib/utils/${util}`
})
mixinsList.forEach(mixin => {
  externals[`${libName}//src/mixins/${mixin}`] = `${libName}/lib/mixins/${mixin}`
})

exports.externals = externals

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  [libName]: path.resolve(__dirname, '../')
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}
