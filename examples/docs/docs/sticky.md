## Sticky 粘性布局

对于支持 `position: sticky;` 的浏览器，使用 `sticky` css粘性布局，对于不支持的浏览器（低版本android浏览器），使用 `scroll` 监听。对于 `sticky` 的用法需要符合 [w3c规范](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

### 按需引入

```javascript
import Vue from 'vue'
import { Sticky } from 'wot-design'

Vue.use(Sticky)
```

### 基本用法

使用 `wd-sticky` 组件将内容包裹，祖先元素（包含父元素）不能有任何 overflow: visible 以外的 overflow 设置，否则无效。

```html
<wd-sticky>
  <wd-button>基本用法</wd-button>
</wd-sticky>
```

### 设置吸顶距离

设置 `offset-top` 可以设置距离父元素顶部指定距离时停滞。

```html
<wd-sticky :offset-top="44">
   <wd-button>吸顶距离</wd-button>
</wd-sticky>
```

:::warning
`wd-sticky` 兼容了不支持 `position: sticky` 的低版本浏览器，计算规则跟 `position: sticky` 一致，都要求祖先元素（包含父元素）不能有任何 overflow: visible 以外的 overflow 设置，如果功能不生效，检测下是否符合条件使用。
:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| offset-top | 距离父级容器顶部距离 | number | - | 0 | - |
| z-index | 吸顶时的 z-index | number | - | 9 | - |