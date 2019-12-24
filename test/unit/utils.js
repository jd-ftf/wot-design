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

export {
  testInstall
}
