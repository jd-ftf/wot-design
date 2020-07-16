## Tag 标签

### 按需引入

```javascript
import Vue from 'vue'
import { Tag } from 'wot-design'

Vue.use(Tag)
```

### 基本用法

设置 `type` 修改标签类型。

```html
<wd-tag>标签</wd-tag>
<wd-tag type="primary">标签</wd-tag>
<wd-tag type="danger">标签</wd-tag>
<wd-tag type="warning">标签</wd-tag>
<wd-tag type="success">标签</wd-tag>
```

### 幽灵标签

设置 `plain` 属性。

```html
<wd-tag plain>标签</wd-tag>
<wd-tag type="primary" plain>标签</wd-tag>
<wd-tag type="danger" plain>标签</wd-tag>
<wd-tag type="warning" plain>标签</wd-tag>
<wd-tag type="success" plain>标签</wd-tag>
```

### 标记标签

设置 `mark` 属性。

```html
<wd-tag mark>标签</wd-tag>
<wd-tag type="primary" mark>标签</wd-tag>
<wd-tag type="danger" mark>标签</wd-tag>
<wd-tag type="warning" mark>标签</wd-tag>
<wd-tag type="success" mark>标签</wd-tag>
```

### 空心标记标签

同时设置 `mark` 和 `plain` 属性。

```html
<wd-tag mark>标签</wd-tag>
<wd-tag type="primary" mark plain>标签</wd-tag>
<wd-tag type="danger" mark plain>标签</wd-tag>
<wd-tag type="warning" mark plain>标签</wd-tag>
<wd-tag type="success" mark plain>标签</wd-tag>
```

### 设置图标

设置 `icon` 左侧图标，也可以使用 'icon' 的 slot 插槽。

```html
<wd-tag icon="wd-icon-clock">标签</wd-tag>
```

### 自定义颜色

设置 `color` 修改文字颜色，设置 `bg-color` 修改背景色和边框颜色。

```html
<wd-tag color="#0083ff" bg-color="#d0e8ff">标签</wd-tag>
```

### 可关闭

设置 `closable` 属性，允许标签关闭，关闭时会触发 `close` 事件。

```html
<wd-tag v-if="isShow" closable round @close="handleClose">标签</wd-tag>

<script>
export default {
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    handleClose () {
      this.isShow = false
    }
  }
}
</script>
```

### 新增标签

设置 `dynamic` 属性，该标签为新增，输入内容确定后触发 `confirm` 事件。
```html
<wd-tag dynamic round></wd-tag>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type | 标签类型 | String | 'primary', 'danger', 'warning', 'success' | - | - |
| plain | 幽灵类型 | Boolean | - | false |
| mark | 标记类型 | Boolean | - | false |
| round | 圆角类型 | Boolean | - | false |
| icon | 左侧图标 | String | - | - |
| color | 文字颜色 | String | - | - |
| bg-color | 背景色和边框色 | String | - | - |
| closable | 可关闭 | Boolean | - | false |
| disable-transition | 禁用动画 | Boolean | - | false |
| dynamic | 新增标签 | Boolean | - | false |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| click | 标签点击时触发 | - |
| close | 点击关闭按钮时触发 | - |
| confirm | 新增标签输入内容确定后触发 | - |

### Slot

| name      | 说明       |
|------------- |----------- |
| icon | 图标 |