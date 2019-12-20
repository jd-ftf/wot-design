import Sticky from './src/main.vue'

Sticky.install = Vue => {
  Vue.component(Sticky.name, Sticky)
}

export default Sticky
