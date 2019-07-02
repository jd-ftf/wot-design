## Lazyload 图片懒加载

### 使用

图片懒加载使用的是开源组件`vue-lazyload`，其用法同 [vue-lazyload](https://github.com/hilongjw/vue-lazyload)。

`jm-design` 对`vue-lazyload`做了默认参数设置：`loading` 参数默认设置为 `JDM` 占位图，`attempt` 参数设置为 3。

如果需要修改参数，修改方式如下：

```javascript
import JMDesign from 'jm-design'

// lazyload 参数同 vue-lazyload 组件参数
Vue.use(JMDesign, {
  lazyload: {
    loading: 'xxx',
    attempt: 1
  }
})
```

#### 按需引入

```javascript
import Vue from 'vue'
import { Lazyload } from 'jm-design'

Vue.use(Lazyload)

// 修改参数
Vue.use(Lazyload, {
  loading: 'xxx',
  attempt: 1
})
```

### 基本用法

```html
<template>
  <div class="lazyload-item" v-for="item in imgs">
    <img v-lazy="item" class="lazyload-img" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgs: [
        'http://img30.360buyimg.com/popXue/jfs/t1/33198/10/12030/268559/5ce7cc9fE1ce41ce7/8e87f20e4c0921de.jpg',
        'http://img30.360buyimg.com/popXue/jfs/t1/50345/6/1100/276789/5ceddedbE88081452/c7cbf2a916e95c89.jpg',
        'http://img30.360buyimg.com/popXue/jfs/t1/84548/16/579/175470/5cec8a91E5204c180/448fb602fab4f9e1.jpg',
        'http://img30.360buyimg.com/popXue/jfs/t1/53645/13/1208/168686/5cef2e9dEc4f71846/6650554817be5e76.jpg',
        'https://img30.360buyimg.com/popXue/jfs/t29878/318/1237453121/304417/d783a160/5cda606bNfef58100.jpg',
        'https://img30.360buyimg.com/popXue/jfs/t1/48387/5/957/44686/5ceb3fa7Ec141027d/fa71e81772b38d94.jpg',
        'https://img30.360buyimg.com/popXue/jfs/t1/74919/40/489/306561/5ceb8265E8ed3b685/d94ba1707abe2c42.png'
      ]
    }
  }
}
</script>

<style>
.lazyload-item {
  margin: 20px 0;
}
/* 对于图片懒加载，建议固定图片的宽度和高度，一方面避免重排重绘，一方面方便使用默认占位图 */
/* 同时需要设置 object-fit: cover; 避免占位符非等比变形 */
.lazyload-img {
  width: 100%;
  height: 36.5vw;
  border-radius: 8px;
  object-fit: cover;
}
</style>
```

### 参数、指令、其他语法

见 `vue-lazyload` [文档](https://github.com/hilongjw/vue-lazyload)