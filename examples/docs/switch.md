## Switch 开关

### 按需引入

```javascript
import Vue from 'vue'
import { Switch } from 'jm-design'

Vue.use(Switch)
```

### 基本用法

`v-model` 为绑定值，默认为 boolean 类型。

```html
<jm-switch v-model="value" />

<script>
export default {
  data () {
    return {
      value: true
    }
  }
}
</script>
```

### 修改值

通过 `active-value` 属性修改开关打开时的值，`inactive-value` 属性修改开关关闭时的值。

```html
<jm-switch v-model="value" active-value="京麦" inactive-value="商家后台" />

<script>
export default {
  data () {
    return {
      value: '京麦'
    }
  }
}
</script>
```

### 修改颜色

通过 `active-color` 属性修改开关打开时的颜色，`inactive-color` 属性修改开关关闭时的颜色。

```html
<jm-switch v-model="value" active-color="#13ce66" inactive-color="#f00" />
```

### 修改大小

设置 `size` 修改开关大小。

```html
<jm-switch v-model="value" size="20px" />
```

### 禁用

设置 `disabled` 属性。

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model   |	绑定值 |	boolean / string / number | - |	-  |
| disabled | 禁用 | boolean | - | false |
| active-value | 打开时的值 | boolean / string / number | - | true |
| inactive-value | 关闭时的值 | boolean / string / number | - | false |
| active-color | 打开时的背景色 | string | - | '#0083ff' |
| inactive-color | 关闭时的背景色，默认为白色，所以有灰色边框，如果设置了该值，则会自动去除灰色边框 | string | - | '#fff' |
| size | 开关大小，可以为任何单位的字符串尺寸 | string | - | '28px' |