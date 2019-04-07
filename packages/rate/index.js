import '@/style/rate.scss'
import Rate from './src/main.vue'

Rate.install = Vue => {
  Vue.component(Rate.name, Rate)
}

export default Rate
