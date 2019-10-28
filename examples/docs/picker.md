## Picker 选择器视图

Picker 组件为 popup 和 pickerView 的组合。

### 按需引入

```javascript
import Vue from 'vue'
import { Picker } from 'jm-design'

Vue.use(Picker)
```

### 基本用法

`columns` 设置数据源，`label` 设置左侧文本内容，`v-model` 设置选中项的值。

```html
<jm-picker :columns="columns1" label="单列选项" v-model="value" />

<script>
export default {
  data () {
    return {
      columns: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
      value: ''
    }
  }
}
</script>
```

### 禁用

设置 `disabled` 属性。

```html
<jm-picker :columns="columns" label="禁用" v-model="value" disabled />

<script>
export default {
  data () {
    return {
      columns: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
      value: '选项3'
    }
  }
}
</script>
```

### 只读

设置 `readonly` 属性。

```html
<jm-picker :columns="columns" label="只读" v-model="value" readonly />
```

### 加载中

设置 `loading` 属性。

```html
<jm-picker-view :columns="columns" loading />
```

### 多列

`columns` 属性设置为二维数组，`v-model` 为数组。

```html
<jm-picker :columns="columns" label="多列" v-model="value" />

<script>
export default {
  data () {
    return {
      columns: [
        ['中山大学', '中南大学', '华南理工大学'],
        ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
      ],
      value: ['中南大学', '软件工程']
    }
  }
}
</script>
```

### 多级联动

传入 `column-change` 属性，其类型为 `function`，接收 pickerView 实例、选中项、当前修改列的下标 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 `setColumnData` 方法修改其他列的数据源。

```html
<jm-picker :columns="columns" label="多列联动" v-model="value" :column-change="onChangeDistrict" :display-format="displayFormat" />

<script>
const district = {
  '0': [{ label: '北京', value: '110000' }, { label: '广东省', value: '440000' }],
  '110000': [{ label: '北京', value: '110100' }],
  '440000': [{ label: '广州市', value: '440100' }, { label: '深圳市', value: '440300' }],
  '110100': [{ label: '东城区', value: '110101' }, { label: '西城区', value: '110102' }],
  '440100': [{ label: '荔湾区', value: '440103' }, { label: '越秀区', value: '440104' }],
  '440300': [{ label: '罗湖区', value: '440303' }, { label: '福田区', value: '440304' }]
}

export default {
  data () {
    return {
      columns: [
        district[0],
        district[district[0][0].value],
        district[district[district[0][0].value][0].value]
      ],
      value: ['110000', '110100', '110102'],
      displayFormat (items) {
        return items.map(item => {
          return item.label
        }).join('-')
      }
    }
  },
  methods: {
    onChangeDistrict (pickerView, item, columnIndex) {
      if (columnIndex === 0) {
        pickerView.setColumnData(1, district[item.value])
        pickerView.setColumnData(2, district[district[item.value][0].value])
        return
      }
      if (columnIndex === 1) {
        pickerView.setColumnData(2, district[item.value])
      }
    }
  }
}
</script>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 选中项，如果为多列选择器，则其类型应为数组 | string / number / boolean / array | - |
| columns | 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器 | array | - | - |
| loading | 加载中 | boolean | - | false |
| arrow-html | 是否使用html渲染选择器内容 | boolean | - | true |
| visible-item-count | 展示的行数 | number | - | 7 |
| item-height | 选项高度 | number | - | 33 |
| value-key | 选项对象中，value对应的 key | string | - | 'label' |
| label-key | 选项对象中，展示的文本对应的 key | string | - | 'value' |
| title | 弹出层标题 | string | - | - |
| cancel-button-text | 取消按钮文案 | string | - | '取消' |
| confirm-button-text | 确认按钮文案 | string | - | '完成' |
| label | 选择器左侧文案 | string | - | - |
| placeholder | 选择器占位符 | string | - | '请选择' |
| disabled | 禁用 | boolean | - | fasle |
| readonly | 只读 | boolean | - | false |
| display-format | 自定义展示文案的格式化函数，返回一个字符串 | function | - | - |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| confirm | 点击右侧按钮触发 | - |
| cancel | 点击左侧按钮触发 | - |
