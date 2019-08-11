import TabbarItem from './src/main.vue'

TabbarItem.install = Vue => {
  Vue.component(TabbarItem.name, TabbarItem)
}

export default TabbarItem
