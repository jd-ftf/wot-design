## 国际化

JM Design 默认使用中文语言。

### 使用其他语言

将需要使用的语言引入，并进行设置。

```javascript
import Vue from 'vue'
import JMDesign from '@jd/jm-design'
import enUS from '@jd/jm-design/lib/locale/lang/en-US'

Vue.use(JMDesign, {
  locale: enUS
})
```

### 按需加载国际化设置：

```javascript
import Vue from 'vue'
import { MessageBox, InfiniteLoad } from '@jd/jm-design'
import locale from '@jd/jm-design/lib/locale'
import enUS from '@jd/jm-design/lib/locale/lang/en-US'

Vue.use(MessageBox)
Vue.use(InfiniteLoad)

locale.use(enUS)
```

### 使用 `Vue-i18n` 国际化插件

```javascript
import Vue from 'vue'
import App from './App'
import JMDesign from '@jd/jm-design'
import VueI18n from 'vue-i18n'
import zhCN from '@jd/jm-design/lib/locale/lang/zh-CN'
import enUS from '@jd/jm-design/lib/locale/lang/en-US'

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

new Vue({
  el: '#app',
  i18n,
  template: '<App/>',
  components: { App }
})
```

### 按需加载使用 vue-i18n

```javascript
import Vue from 'vue'
import { MessageBox, InfiniteLoad } from '@jd/jm-design'
import VueI18n from 'vue-i18n'
import zhCN from '@jd/jm-design/lib/locale/lang/zh-CN'
import enUS from '@jd/jm-design/lib/locale/lang/en-US'
import locale from '@jd/jm-design/lib/locale'

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

Vue.use(MessageBox)
Vue.use(InfiniteLoad)

locale.i18n((key, value) => i18n.t(key, value))
```

### 通过 CDN 方式加载语言文件

```html
<script src="//static.360buyimg.com/bus/lib/vue/2.5.17/vue.js"></script>
<script src="//static.360buyimg.com/bus/lib/element-shop/index.js"></script>
<script src="//static.360buyimg.com/bus/lib/element-shop/umd/locale/en.js"></script>

<script>
  ELEMENT.locale(ELEMENT.lang.en)
</script>
```

### 支持的语言

* zh-CN 简体中文
* en-US 英文
