import Row from './src/main.vue'

Row.install = Vue => {
  Vue.component(Row.name, Row)
}

export default Row
