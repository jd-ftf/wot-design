import Loading from './src/main.vue'

Loading.install = Vue => {
  Vue.component(Loading.name, Loading)
}

export default Loading
