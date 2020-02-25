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

export {
  testInstall,
  later
}
