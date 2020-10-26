## Rate 评分

### 按需引入

```javascript
import Vue from 'vue'
import { Rate } from 'wot-design'

Vue.use(Rate)
```

### 基本用法

`v-model` 为绑定值，设置分数。

```html
<wd-rate v-model="rate"></wd-rate>

<script>
export default {
  data () {
    return {
      rate: 5
    }
  }
}
</script>
```

### 只读

设置 `readonly` 属性。

```html
<wd-rate v-model="rate" readonly></wd-rate>
```

### 禁用

设置 `disabled` 属性。

```html
<wd-rate v-model="rate" disabled></wd-rate>
```

### 修改颜色

可以通过 `color` 属性修改未选中的颜色，`active-color` 修改选中的颜色。

```html
<wd-rate v-model="rate" active-color="linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)"></wd-rate>
<wd-rate v-model="rate" :active-color="['linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)', 'linear-gradient(315deg, rgba(245,34,34,1) 0%,rgba(255,117,102,1) 100%)']" />
```

### 修改icon

可以通过 `icon` 属性修改未选中的图标，`active-icon` 修改选中的图标。

```html
<wd-rate v-model="rate" icon="wd-icon-dong" active-icon="wd-icon-dong" active-color="#4D80F0"></wd-rate>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value / v-model | 当前分数 | number | — | —       |
| num | 评分最大值 | number | - | 5 |
| readonly | 是否只读 | boolean | - | false |
| size   | 图标大小 | string | - | '16px' |
| space | 图标间距 | string | - | '4px' |
| color | 未选中的图标颜色  | string | - | '#E8E8E8' |
| active-color | 选中的图标颜色(支持传颜色数组，共有 2 个元素，为 2 个分段所对应的颜色) | string/array | - | 'linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)' |
| icon | 未选中的图标类名 | string | - | 'wd-icon-star-on' |
| active-icon | 选中的图标类名 | string | - | 'wd-icon-star-on' |
| disabled | 是否禁用 | boolean | - | false |
| disabled-color    | 禁用的图标颜色 | string | - | 'linear-gradient(315deg, rgba(177,177,177,1) 0%,rgba(199,199,199,1) 100%)' |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 修改评分时触发 | value: 改后的评分 |
