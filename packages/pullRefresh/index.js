import PullRefresh from './src/main.vue'

PullRefresh.install = Vue => {
  Vue.component(PullRefresh.name, PullRefresh)
}

export default PullRefresh
