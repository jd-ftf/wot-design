import Search from './src/main'

Search.install = Vue => {
  Vue.component(Search.name, Search)
}

export default Search
