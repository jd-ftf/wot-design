import Lazyload from 'vue-lazyload'
import lazyPlaceholder from './img/placeholder.png'

export default {
  install (Vue, options) {
    Vue.use(Lazyload, Object.assign({
      loading: lazyPlaceholder,
      attempt: 3
    }, options))
  }
}
