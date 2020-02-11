import Vue from 'vue'
import App from './App'
import WotDesign from 'main/index'
import '../../src/style/index.scss'
import router from './route'
import './assets/style/base.scss'
import WhiteSpace from './components/whiteSpace.vue'
import Space from './components/space.vue'
import TouchEmulator from './utils/touch-emulator'
import VueI18n from 'vue-i18n'
import zhCN from 'main/locale/lang/zh-CN'
import enUS from 'main/locale/lang/en-US'

if (!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
  new TouchEmulator()
}

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    'zh_CN': {
      hello: '你好',
      ...zhCN
    },
    'en_US': {
      hello: 'Hello',
      ...enUS
    }
  }
})
Vue.use(WotDesign, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.component(WhiteSpace.name, WhiteSpace)
Vue.component(Space.name, Space)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
