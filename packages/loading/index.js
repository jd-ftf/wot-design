import '@/style/loading.scss'
import loading from './src/loading'
import Indicator from './src/indicator'

export default {
  install (Vue) {
    Vue.components(Indicator.name, Indicator)
    Vue.prototype.$loading = loading
  },
  Indicator,
  loading
}
