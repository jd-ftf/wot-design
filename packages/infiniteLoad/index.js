import '@/style/infiniteLoad.scss'
import InfiniteLoad from './src/main.vue'

InfiniteLoad.install = Vue => {
  Vue.component(InfiniteLoad.name, InfiniteLoad)
}

export default InfiniteLoad
