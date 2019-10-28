## Radio 单选框

### 按需引入

```javascript
import Vue from 'vue'
import { RadioGroup, Radio } from 'jm-design'

Vue.use(RadioGroup)
Vue.use(Radio)
```

### 基本用法

`v-model` 为绑定值，为选中的 `jm-radio` 的 `value` 值。

```html
<jm-radio-group v-model="radio">
  <jm-radio value="1">单选框1</jm-radio>
  <jm-radio value="2">单选框2</jm-radio>
</jm-radio-group>

<script>
export default {
  data () {
    return {
      radio: '1'
    }
  }
}
</script>
```

### 修改图标形状

修改 `shape` 属性，可选值为 'circle'、'dot'、'button'，默认为 'circle'。

```html
<jm-radio-group v-model="radio1" shape="dot">
  <jm-radio value="1">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>

<jm-radio-group v-model="radio2" shape="button">
  <jm-radio value="1">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>
```

可以只修改其中某个radio的图标形状。

```html
<jm-radio-group v-model="radio">
  <jm-radio value="1" shape="dot">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>
```

### 修改选中的颜色

设置 `checked-color` 属性。

```html
<jm-radio-group v-model="radio" checked-color="#f00">
  <jm-radio value="1">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>
```

### 禁用

可以在 `radio-group` 上面设置 `disabled`，禁用所有单选框，也可以在单个单选框上面设置 `disabled` 属性，禁用某个单选框。

```html
<jm-radio-group v-model="radio" disabled>
  <jm-radio value="1">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>
```

### RadioGroup Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值 | string / number / boolean | - | - |
| shape | 单选框形状 | string | 'circle', 'dot', 'button' | 'circle' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |

### RadioGroup Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 绑定值变化时触发 | 选中值 |

### Radio Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 单选框选中时的值 | string / number / boolean | - | - |
| shape | 单选框形状 | string | 'circle', 'dot', 'button' | 'circle' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |