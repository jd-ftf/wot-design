## PickerView 选择器视图

### 按需引入

```javascript
import Vue from 'vue'
import { PickerView } from 'jm-design'

Vue.use(PickerView)
```

### 基本用法

单列选择器，给 `columns` 传入一个数值数组，可以通过 `default-index` 属性设置默认选中项，通过监听 `change` 事件获取选中值。

```html
<jm-picker-view :columns="columns1" @change="onChange" :default-index="2" />

<script>
export default {
  data () {
    return {
      columns1: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7']
    }
  },
  methods: {
    onChange (picker, value, index) {
      this.$toast(`当前选中项: ${value}, 下标: ${index}`)
    }
  }
}
</script>
```
