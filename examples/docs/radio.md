## Radio 单选框

### 使用

#### 按需引入

```javascript
import Vue from 'vue'
import { RadioGroup, Radio } from 'jm-design'

Vue.use(RadioGroup)
Vue.use(Radio)
```

#### 示例

```html
<!-- 基本用法 -->
<jm-radio-group v-model="radio1">
  <jm-radio value="1">单选框1</jm-radio>
  <jm-radio value="2">单选框2</jm-radio>
</jm-radio-group>

<!-- 修改单选框形状: shaped, 默认为 'circle', 支持对单个radio标签修改形状 -->
<jm-radio-group v-model="radio2" shape="dot">
  <jm-radio value="1">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>

<jm-radio-group v-model="radio3" shape="button">
  <jm-radio value="1">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>

<jm-radio-group v-model="radio4">
  <jm-radio value="1" shape="dot">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>

<!-- 修改选中的颜色: checked-color -->
<jm-radio-group v-model="radio5" checked-color="#f00">
  <jm-radio value="1">京麦</jm-radio>
  <jm-radio value="2">商家后台</jm-radio>
</jm-radio-group>

<!-- 设置禁用: disabled, 支持对单个radio标签设置 disabled -->
<jm-radio-group v-model="radio6" disabled>
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
| name | 原生属性 | string | - | - |