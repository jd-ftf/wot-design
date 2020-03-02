import Col from './src/main.vue'

Col.install = Vue => {
  Vue.component(Col.name, Col)
}

export default Col
