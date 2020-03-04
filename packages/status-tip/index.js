import StatusTip from './src/main.vue'

StatusTip.install = Vue => {
  Vue.component(StatusTip.name, StatusTip)
}

export default StatusTip
