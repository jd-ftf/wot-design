import Vue from 'vue'
import router from './route'
import App from './App'
import './assets/style/base.scss'
import './assets/fonts/iconfont.css'
import DemoBlock from './components/demoBlock.vue'

Vue.config.productionTip = false

Vue.component(DemoBlock.name, DemoBlock)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
