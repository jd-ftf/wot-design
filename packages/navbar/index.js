import Navbar from './src/main.vue'
import '@/style/base.scss'
import '@/style/components/navbar.scss'

Navbar.install = Vue => {
  Vue.component(Navbar.name, Navbar)
}

export default Navbar
