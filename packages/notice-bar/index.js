import NoticeBar from './src/main.vue'

NoticeBar.install = Vue => {
  Vue.component(NoticeBar.name, NoticeBar)
}

export default NoticeBar
