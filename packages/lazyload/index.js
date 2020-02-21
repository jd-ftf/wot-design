import Lazyload from 'vue-lazyload'
import lazyLoading from './img/loading.svg'

export default {
  install (Vue, options) {
    Vue.use(Lazyload, Object.assign({
      loading: lazyLoading,
      attempt: 3
    }, options))
  }
}
