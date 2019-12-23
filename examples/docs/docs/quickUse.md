## 快速上手

本节介绍如何在单页面应用中使用 `WotDesign`

### 使用 vue-cli

```bash
(sudo) npm install -g @vue/cli
vue create example
cd example
npm i wot-design 
```

> 使用京东的npm私域，`npm config set @jd:registry=http://registry.m.jd.com`

使用 vue-cli 脚手架快速创建一个 Vue 项目，并在该项目中安装 `wot-design`

### 引入 WotDesign

在项目的 src/main.js 文件中，引入 `WotDesign`

```javascript
import Vue from 'vue'
import App from './App.vue'
import WotDesign from 'wot-design'
import 'wot-design/lib/theme-default/index.css'

Vue.use(WotDesign)

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
      "libraryName": "wot-design",
      "style": true
    }]
  ]
}
```

接下来，引入需要使用的部分组件，如 Button：

```javascript
import Vue from 'vue'
import { Button } from 'wot-design'

Vue.use(Button)
```

### 开始使用

组件库的引入使用配置便完成了，下一章是介绍如何自定义主题样式，如果不需要自定义主题，可直接根据需要使用的组件查看相应的文档。