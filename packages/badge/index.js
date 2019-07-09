import Badge from './src/main.vue'

/* istanbul ignore next */
Badge.install = Vue => {
  Vue.component(Badge.name, Badge)
}

export default Badge
