import '@/style/components/rate.scss'
import '@/style/icon.scss'
import Rate from './src/main.vue'

Rate.install = Vue => {
  Vue.component(Rate.name, Rate)
}

export default Rate
