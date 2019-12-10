import Vue from 'vue'
import App from './App'
import JMDesign from '@/index'
import '../src/style/index.scss'
import router from './route'
import './assets/style/base.scss'
import WhiteSpace from './components/whiteSpace.vue'
import Space from './components/space.vue'
import '@vant/doc/helper/touch-simulator'
import VueI18n from 'vue-i18n'
import zhCN from '@/locale/lang/zh-CN'
import enUS from '@/locale/lang/en-US'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en_US',
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
Vue.use(JMDesign, {
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
  template: '<App/>',
  components: { App }
})
