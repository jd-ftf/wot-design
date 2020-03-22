import Vue from 'vue'

const testInstall = component => {
  return test('should install successfully', () => {
    Vue.use(component)
    const plugin = Vue._installedPlugins.filter(item => {
      return item.name === component.name
    })
    expect(plugin.length).toBe(1)
  })
}

const later = delay => {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

/**
 * @description 获取包含从start到end的随机整数
 * @param {Number} start
 * @param {Number} end
 * @return {Number}
 */
const getRandNum = (start = 1, end = 4) => {
  return Math.floor(Math.random() * (end - start) + start)
}

export {
  testInstall,
  later,
  getRandNum
}
