import Tab from './src/main.vue'

Tab.install = Vue => {
  Vue.component(Tab.name, Tab)
}

export default Tab
