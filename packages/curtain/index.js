import Curtain from './src/main.vue'

Curtain.install = Vue => {
  Vue.component(Curtain.name, Curtain)
}

export default Curtain
