import Badge from './src/main.vue'

Badge.install = Vue => {
  Vue.component(Badge.name, Badge)
}

export default Badge
