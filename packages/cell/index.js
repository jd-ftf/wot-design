import Cell from './src/main.vue'
Cell.install = Vue => {
  Vue.component(Cell.name, Cell)
}

export default Cell
