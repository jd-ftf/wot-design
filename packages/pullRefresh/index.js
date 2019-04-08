import PullRefresh from './src/main.vue'

PullRefresh.install = Vue => {
  Vue.components(PullRefresh.name, PullRefresh)
}

export default PullRefresh
