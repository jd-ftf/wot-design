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
```

### 标签大小

设置 `size` 属性，默认为 'medium' 大小，可选值 'small', 'large'。

```html
<wd-tag size="small">标签</wd-tag>
<wd-tag>标签</wd-tag>
<wd-tag size="large">标签</wd-tag>
```

### 自定义颜色

设置 `color` 修改文字颜色，设置 `bg-color` 修改背景色和边框颜色。

```html
<wd-tag color="#0083ff" bg-color="#d0e8ff">标签</wd-tag>
```

### 设置图标

设置 `icon` 左侧图标，也可以使用 'icon' 的 slot 插槽。

```html
<wd-tag icon="wd-icon-tickets">标签</wd-tag>
```

### 可关闭

设置 `closable` 属性，允许标签关闭，关闭时会触发 `close` 事件。

```html
<wd-tag v-if="isShow" closable @close="handleClose">标签</wd-tag>

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

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type | 标签类型 | String | 'primary', 'danger', 'warning', 'success' | - | - |
| plain | 幽灵类型 | Boolean | - | false |
| size | 标签大小 | String | 'small', 'large' | - |
| icon | 左侧图标 | String | - | - |
| color | 文字颜色 | String | - | - |
| bg-color | 背景色和边框色 | String | - | - |
| closable | 可关闭 | Boolean | - | false |
| disable-transition | 禁用动画 | Boolean | - | false |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| click | 标签点击时触发 | - |
| clsoe | 点击关闭按钮时触发 | - |

### Slot

| name      | 说明       |
|------------- |----------- |
| icon | 图标 |