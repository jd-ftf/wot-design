## 国际化

JM Design 默认使用中文语言。

### 使用其他语言

将需要使用的语言引入，并进行设置。

```javascript
import Vue from 'vue'
import JMDesign from 'jm-design'
import enUS from 'jm-design/lib/locale/lang/en-US'

Vue.use(JMDesign, {
  locale: enUS
})
```

按需加载国际化设置：

```javascript
import Vue from 'vue'
import { MessageBox, InfiniteLoad } from 'jm-design'
import locale from 'jm-design/lib/locale'
import enUS from 'jm-design/lib/locale/lang/en-US'

Vue.use(MessageBox)
Vue.use(InfiniteLoad)

locale.use(enUS)
```

### 使用 `Vue-i18n` 国际化插件

```javascript
import Vue from 'vue'
import App from './App'
import JMDesign from 'jm-design'
import VueI18n from 'vue-i18n'
import zhCN from '@/locale/lang/zh-CN'
import enUS from '@/locale/lang/en-US'

Vue.use(VueI18n)
Vue.use(JMDesign)

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

new Vue({
  el: '#app',
  i18n,
  template: '<App/>',
  components: { App }
})
```

### 支持的语言

* zh-CN 简体中文
* en-US 英文
