import Vue from 'vue'
import router from './route'
import App from './App'
import './assets/style/base.scss'
import './assets/fonts/iconfont.css'
import { isMac } from './utils/index'

Vue.config.productionTip = false

if (!isMac) {
  document.body.classList.add('body-scrollbar')
}

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
