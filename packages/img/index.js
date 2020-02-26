import Img from './src/main.vue'

Img.install = Vue => {
  Vue.component(Img.name, Img)
}

export default Img
