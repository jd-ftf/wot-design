import CellGroup from './src/main.vue'
CellGroup.install = Vue => {
  Vue.component(CellGroup.name, CellGroup)
}

export default CellGroup
