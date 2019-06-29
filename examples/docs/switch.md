## Switch 开关

### 使用

#### 按需引入

```javascript
import Vue from 'vue'
import { Switch } from 'jm-design'

Vue.use(Switch)
```

#### 示例

```html
<!-- 基本用法 -->
<jm-switch v-model="value1" />

<!-- 修改 active 和 inactive 的值 -->
<jm-switch v-model="value2" active-value="京麦" inactive-value="商家后台" />

<!-- 自定义颜色 active-color, inactive-color -->
<jm-switch v-model="value3" active-color="#13ce66" inactive-color="#f00" />

<!-- 修改大小, size -->
<jm-switch v-model="value4" size="20px" />

<!-- 禁用，disabled -->
<jm-switch v-model="value5" disabled />

<script>
export default {
  data () {
    return {
      value1: true,
      value2: '京麦',
      value3: true,
      value4: false,
      value5: true
    }
  }
}
</script>
```

### Arrtibute

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model   |	绑定值 |	boolean / string / number | - |	-  |
| disabled | 禁用 | boolean | - | false |
| active-value | 打开时的值 | boolean / string / number | - | true |
| inactive-value | 关闭时的值 | boolean / string / number | - | false |
| active-color | 打开时的背景色 | string | - | '#0083ff' |
| inactive-color | 关闭时的背景色，默认为白色，所以有灰色边框，如果设置了该值，则会自动去除灰色边框 | string | - | '#fff' |
| size | 开关大小，可以为任何单位的字符串尺寸 | string | - | '28px' |