## InputNumber 计数器

### 按需引入

```javascript
import Vue from 'vue'
import { InputNumber } from 'wot-design'

Vue.use(InputNumber)
```

### 基本用法

`v-model` 为绑定值。

```html
<wd-input-number v-model="value"></wd-input-number>

<script>
export default {
  data () {
    return {
      value1: 1
    }
  }
}
</script>
```

### 设置步长

设置 `step` 步长。

```html
<wd-input-number v-model="value" :step="2"></wd-input-number>
```

### 设置最小最大值

设置 `min` 最小值，`max` 最大值。`min` 默认为1。

```html
<wd-input-number v-model="value" :min="3" :max="10"></wd-input-number>
```

### 禁用

设置 `disabled` 属性。

```html
<wd-input-number v-model="value" disabled></wd-input-number>
```

### 无输入框

设置 `without-input` ，不展示输入框。

```html
<wd-input-number v-model="value" without-input></wd-input-number>
```

### 设置小数精度

设置 `precision` 属性，默认为0。

```html
<wd-input-number v-model="value" :precision="2" :step="0.1"></wd-input-number>
```

### 严格步数倍数

设置 `step-strictly` 属性，强制输入框输入内容为 `step` 的倍数（当用户输入完成后触发change时，会更正输入框内容）。

```html
<wd-input-number v-model="value" step-strictly :step="2"></wd-input-number>
```

### 修改输入框宽度

设置 `input-width` 设置宽度，该值接受1个字符串，可以是表示尺寸的任何单位。

```html
<wd-input-number v-model="value" input-width="70px"></wd-input-number>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值 | number / string | - | - |
| min | 最小值 | number | - | 1 |
| max | 最大值 | number | - | Infinity |
| step | 步数 | number | - | 1 |
| step-strictly | 严格值为步数的倍数 | boolean | - | false |
| precision | 小数精度 | number | - | 0 |
| disabled | 禁用 | boolean | - | false |
| without-input | 不显示输入框 | boolean | - | false |
| input-width | 输入框宽度 | string | - | 36px |
