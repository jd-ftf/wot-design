import Lazyload from 'vue-lazyload'
import lazyLoading from './img/loading.svg'
import lazyError from './img/error.svg'

export default {
  install (Vue, options) {
    Vue.use(Lazyload, Object.assign({
      loading: lazyLoading,
      error: lazyError,
      attempt: 3
    }, options))
  }
}
