import Navbar from './src/main.vue'
import '@/style/navbar.scss'

Navbar.install = Vue => {
  Vue.component(Navbar.name, Navbar)
}

export default Navbar
