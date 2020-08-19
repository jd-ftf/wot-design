import Anchor from './src/main.vue'

Anchor.install = Vue => {
  Vue.component(Anchor.name, Anchor)
}

export default Anchor
