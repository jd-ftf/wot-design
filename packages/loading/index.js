import loading from './src/loading'
import Indicator from './src/indicator'

export default {
  install (Vue) {
    Vue.component(Indicator.name, Indicator)
    Vue.prototype.$loading = loading
  },
  Indicator,
  loading
}
