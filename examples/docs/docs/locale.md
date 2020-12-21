## 国际化

Wot Design 默认使用中文语言。

### 使用其他语言

将需要使用的语言引入，并进行设置。

```javascript
import Vue from 'vue'
import WotDesign from 'wot-design'
import enUS from 'wot-design/lib/locale/lang/en-US'

Vue.use(WotDesign, {
  locale: enUS
})
```

### 按需加载国际化设置：

```javascript
import Vue from 'vue'
import { MessageBox, InfiniteLoad } from 'wot-design'
import locale from 'wot-design/lib/locale'
import enUS from 'wot-design/lib/locale/lang/en-US'

Vue.use(MessageBox)
Vue.use(InfiniteLoad)

locale.use(enUS)
```

### 使用 `Vue-i18n` 国际化插件

```javascript
import Vue from 'vue'
import App from './App'
import WotDesign from 'wot-design'
import VueI18n from 'vue-i18n'
import zhCN from 'wot-design/lib/locale/lang/zh-CN'
import enUS from 'wot-design/lib/locale/lang/en-US'

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

Vue.use(WotDesign, {
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
import { MessageBox, InfiniteLoad } from 'wot-design'
import VueI18n from 'vue-i18n'
import zhCN from 'wot-design/lib/locale/lang/zh-CN'
import enUS from 'wot-design/lib/locale/lang/en-US'
import locale from 'wot-design/lib/locale'

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
<script src="//cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="//cdn.jsdelivr.net/npm/wot-design/lib/index.js"></script>
<script src="//cdn.jsdelivr.net/npm/wot-design/lib/umd/locale/en-US.js"></script>

<script>
  WotDesign.locale(WotDesign.lang.enUS)
</script>
```

### CDN 方式配合 vue-i18n

```html
<script src="//cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="//cdn.jsdelivr.net/npm/vue-i18n/dist/vue-i18n.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/wot-design/lib/index.js"></script>
<script src="//cdn.jsdelivr.net/npm/wot-design/lib/umd/locale/zh-CN.js"></script>
<script src="//cdn.jsdelivr.net/npm/wot-design/lib/umd/locale/en-US.js"></script>

<script>
  var i18n = new VueI18n({
    locale: 'en_US',
    messages: {
      'zh_CN': Object.assign({
        hello: '你好'
      }, WotDesign.lang.zhCN),
      'en_US': Object.assign({
        hello: 'Hello'
      }, WotDesign.lang.enUS)
    }
  })
  // 修改组件库的翻译函数的执行
  WotDesign.i18n(function (key, value) {
    return i18n.t(key, value)
  })
  new Vue({
    el: '#app',
    i18n: i18n
  })

  // 模拟切换语言
  setTimeout(function () {
    i18n.locale = 'zh_CN'
  }, 2000)
</script>
```

### 支持的语言

* zh-CN 简体中文
* en-US 英文
* th-TH 泰文
