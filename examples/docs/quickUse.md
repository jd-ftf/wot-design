## 快速上手

本节介绍如何在单页面应用中使用 `JMDesign`

### 使用 vue-cli

```bash
(sudo) npm install -g @vue/cli
vue create example
cd example
npm i jm-design
```

使用 vue-cli 脚手架快速创建一个 Vue 项目，并在该项目中安装 `jm-design`

### 引入 JMDesign

在项目的 src/main.js 文件中，引入 `JMDesign`

```javascript
import Vue from 'vue'
import App from './App.vue'
import JMDesign from 'jm-design'
import 'jm-design/lib/theme-default/index.css'

Vue.use(JMDesign)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 按需引入

借助 [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-import

```bash
npm i babel-plugin-import -D
```

然后，将 .babelrc 修改为：

```json
{
  "plugins": [
    ["import", {
      "libraryName": "JMDesign",
      "style": true
    }]
  ]
}
```

接下来，引入需要使用的部分组件，如 Button：

```javascript
import Vue from 'vue'
import { Button } from 'jm-design'

Vue.use(Button)
```

如果想通过 script 和 link 标签只引入自己想要的组件，则引入的方式如下：

```html
<link rel="stylesheet" href="//static.360buyimg.com/bus/lib/jm-design/theme-default/button.css" />

<script src="//static.360buyimg.com/bus/lib/jm-design/button/index.js"></script>
```

引入后调用 `Vue.use(JMDesign.button)` 进行组件注册。

引入其他组件链接则将 button 换成组件的名字即可，如果组件名为小驼峰法，则将大写字母换成小写并用 `-` 连接，如下拉刷新组件 `pullRefresh` 则为 `pull-refresh`。

### 开始使用

组件库的引入使用配置便完成了，下一章是介绍如何自定义主题样式，如果不需要自定义主题，可直接根据需要使用的组件查看相应的文档。