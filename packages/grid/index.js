import Grid from './src/main.vue'

Grid.install = Vue => {
  Vue.component(Grid.name, Grid)
}

export default Grid
