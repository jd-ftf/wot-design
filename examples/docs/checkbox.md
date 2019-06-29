## Checkbox 复选框

### 使用

#### 按需引入

```javascript
import Vue from 'vue'
import { CheckboxGroup, Checkbox } from 'jm-design'

Vue.use(CheckboxGroup)
Vue.use(Checkbox)
```

#### 示例

```html
<!-- 基本用法 -->
<jm-checkbox v-model="value1">单选框1</jm-checkbox>

<!-- 修改复选框形状: shape, 默认为 'circle', 可以在复选框组上对所有复选框进行设置 -->
<jm-checkbox v-model="value2" shape="square">京麦</jm-checkbox>

<jm-checkbox v-model="value3" shape="button">京麦</jm-checkbox>

<!-- 修改选中的颜色: checked-color -->
<jm-checkbox v-model="value4" checked-color="#f00">京麦</jm-checkbox>

<!-- 修改 true-value 和 false-value，修改选中值和非选中值。如果不设置，v-model 默认为 true 和 false 切换 -->
<jm-checkbox v-model="value5" true-value="京麦" false-value="商家后台">复选框</jm-checkbox>

<!-- 复选框组，v-model 为数组，单个复选框通过 value 设置选中值 -->
<jm-checkbox-group v-model="value6">
  <jm-checkbox value="jingmai">京麦</jm-checkbox>
  <jm-checkbox value="shop">商家后台</jm-checkbox>
</jm-checkbox-group>

<!-- 设置禁用: disabled, 支持对单个 checkbox 标签设置 disabled -->
<jm-checkbox-group v-model="value7" disabled>
  <jm-checkbox value="jingmai">京麦</jm-checkbox>
  <jm-checkbox value="shop">商家后台</jm-checkbox>
</jm-checkbox-group>

<!-- 设置最小选中的数量 min 和最大选中的数量 max ，如果要默认设置某个选项固定被选中，则给该复选框设置 disabled -->
<jm-checkbox-group v-model="value8" :min="1" :max="3">
  <jm-checkbox value="jd">京东</jm-checkbox>
  <jm-checkbox value="jingmai">京麦</jm-checkbox>
  <jm-checkbox value="shop">商家后台</jm-checkbox>
  <jm-checkbox value="market">营销中心</jm-checkbox>
</jm-checkbox-group>

<script>
export default {
  data () {
    return {
      value1: true,
      value2: true,
      value3: true,
      value4: true,
      value5: '京麦',
      value6: ['jingmai'],
      value7: ['jingmai'],
      value8: ['jd']
    }
  }
}
</script>
```

### CheckboxGroup Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值 | Array | - | - |
| shape | 单选框形状 | string | 'circle', 'square', 'button' | 'circle' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |
| min | 最小选中的数量 | number | - | 0 |
| max | 最大选中的数量，0 为无限数量，默认为 0 | number | - | 0 |

### CheckboxGroup Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 绑定值变化时触发 | 更新后的值 |

### Checkbox Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value | 单选框选中时的值 | string / number / boolean | - | - |
| shape | 单选框形状 | string | 'circle', 'square', 'button' | 'circle' |
| checked-color | 选中的颜色 | string | - | '#0083ff' |
| disabled | 禁用 | boolean | - | false |
| true-value | 选中值，在 checkbox-group 中使用无效，需同 false-value 一块使用 | string / number | - | - |
| false-value | 非选中时的值，在 checkbox-group 中使用无效，需同 true-value 一块使用 | string /number | - | - |

### Checkbox Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 绑定值变化时触发 | 更新后的值 |

### Checkbox Methods

| 方法名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| toggle | 切换当前选中状态 | - |