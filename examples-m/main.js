import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import JMDesign from '@/index'
import router from './route'
import './assets/style/base.scss'

FastClick.attach(document.body)

Vue.use(JMDesign)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
