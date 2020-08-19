import Pagination from './src/main.vue'

Pagination.install = Vue => {
  Vue.component(Pagination.name, Pagination)
}

export default Pagination
