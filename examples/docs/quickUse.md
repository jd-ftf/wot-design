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

Vue.use(JMDesign)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```
