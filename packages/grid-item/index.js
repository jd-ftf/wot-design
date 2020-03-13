import GridItem from './src/main.vue'

GridItem.install = Vue => {
  Vue.component(GridItem.name, GridItem)
}

export default GridItem
