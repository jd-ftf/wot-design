import DropMenu from './src/main.vue'

DropMenu.install = Vue => {
  Vue.component(DropMenu.name, DropMenu)
}

export default DropMenu
