## Radio 单选框

### 按需引入

```javascript
import Vue from 'vue'
import { RadioGroup, Radio } from 'wot-design'

Vue.use(RadioGroup)
Vue.use(Radio)
```

### 基本用法

`v-model` 为绑定值，为选中的 `wd-radio` 的 `value` 值。

```html
<wd-radio-group v-model="value">
  <wd-radio value="1">单选框1</wd-radio>
  <wd-radio value="2">单选框2</wd-radio>
</wd-radio-group>

<script>
export default {
  data () {
    return {
      value: '1'
    }
  }
}
</script>
```

### 同行展示

设置 `inline` 属性，使单选框在同一行展示。

```html
<wd-radio-group v-model="value" inline>
  <wd-radio value="1">单选框1</wd-radio>
  <wd-radio value="2">单选框2</wd-radio>
</wd-radio-group>
```

### 修改图标形状

修改 `shape` 属性，可选值为 'dot'、'button'，默认为 'dot'。

```html
<wd-radio-group v-model="value" shape="button">
  <wd-radio value="1">京麦</wd-radio>
  <wd-radio value="2">商家后台</wd-radio>
</wd-radio-group>
```

### 修改选中的颜色

设置 `checked-color` 属性。

```html
<wd-radio-group v-model="value" checked-color="#f00">
  <wd-radio value="1">京麦</wd-radio>
  <wd-radio value="2">商家后台</wd-radio>
</wd-radio-group>
```

### 禁用

可以在 `radio-group` 上面设置 `disabled`，禁用所有单选框，也可以在单个单选框上面设置 `disabled` 属性，禁用某个单选框。

```html
<wd-radio-group v-model="value" disabled>
  <wd-radio value="1">京麦</wd-radio>
  <wd-radio value="2">商家后台</wd-radio>
</wd-radio-group>
```

### RadioGroup Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值 | string / number / boolean | - | - |
| shape | 单选框形状 | string | 'dot', 'button' | 'dot' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |
| inline | 同行展示 | boolean | - | false |

### RadioGroup Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 绑定值变化时触发 | 选中值 |

### Radio Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 单选框选中时的值 | string / number / boolean | - | - |
| shape | 单选框形状 | string | 'dot', 'button' | 'dot' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |