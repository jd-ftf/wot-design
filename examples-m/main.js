import Vue from 'vue'
import App from './App'
import JMDesign from '@/index'
import '@/style/index.scss'
import router from './route'
import './assets/style/base.scss'
import WhiteSpace from './components/whiteSpace.vue'
import '@vant/doc/helper/touch-simulator'

Vue.use(JMDesign)
Vue.component(WhiteSpace.name, WhiteSpace)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
