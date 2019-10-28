import Tabbar from './src/main.vue'

Tabbar.install = Vue => {
  Vue.component(Tabbar.name, Tabbar)
}

export default Tabbar
