import Navbar from './src/main.vue'

Navbar.install = Vue => {
  Vue.component(Navbar.name, Navbar)
}

export default Navbar
