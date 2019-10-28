import Progress from './src/main.vue'

Progress.install = Vue => {
  Vue.component(Progress.name, Progress)
}

export default Progress
