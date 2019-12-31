## Sticky 粘性布局

对于支持 `position: sticky;` 的浏览器，使用 `sticky` css粘性布局，对于不支持的浏览器（低版本android浏览器），使用 `scroll` 监听。对于 `sticky` 的用法需要符合 [w3c规范](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

### 按需引入

```javascript
import Vue from 'vue'
import { Sticky } from 'wot-design'

Vue.use(Sticky)
```

### 基本用法

使用 `Sticky` 组件将内容包裹，父级元素能有任何 overflow:visible 以外的 overflow 设置，且不能设置 height 固定高度，否则无效。

```html
<Sticky>
  <p>这是第一个标题</p>
</Sticky>
```

### 设置顶部距离

设置 `offset-top` 可以设置距离父元素顶部指定距离时停滞。

```html
<sticky :offset-top="44">
  <p>这是第一个标题</p>
</sticky>
```

### 设置容器

对于不支持 `sticky` 的浏览器，需要设置容器 `container` ，默认为 body。

```html
<div class="page-sticky-container" ref="container1">
  <sticky :offset-top="150" :container="container1">
    <p class="page-sticky-title">这是第三个标题</p>
  </sticky>
</div>

<script>
export default {
  data () {
    return {
      container1: ''
    }
  },
  mounted () {
    this.container1 = this.$refs.container1
  }
}
</script>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| offset-top | 距离父级容器顶部距离 | number | - | 0 |
| container | 低版本浏览器兼容，手动设置父级容器 | HTMLElement | - | body |
| z-index | 吸顶时的 z-index | number | - | 9 |