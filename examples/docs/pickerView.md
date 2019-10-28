## PickerView 选择器视图

### 按需引入

```javascript
import Vue from 'vue'
import { PickerView } from 'jm-design'

Vue.use(PickerView)
```

### 基本用法

单列选择器，给 `columns` 传入一个数值数组，设置 `v-model` 绑定值。选项可以为字符串，也可以为对象，如果为对象则默认取 `label` 属性为选项内容进行渲染，`v-model` 获取的值为 `value` 属性的值，如果 `value` 属性不存在，则取 `label` 的值。

```html
<jm-picker-view :columns="columns" v-model="value" @change="onChange" />

<script>
export default {
  data () {
    return {
      columns: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
      value: '选项1'
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

### 禁用选项

选项可以为对象，设置 `disabled` 属性。

```html
<jm-picker-view :columns="columns" v-model="value" />

<script>
export default {
  data () {
    return {
      columns: [
        {
          label: '选项1'
        }, {
          label: '选项2'
        }, {
          label: '选项3',
          disabled: true
        }, {
          label: '选项4'
        }, {
          label: '选项5'
        }, {
          label: '选项6'
        }, {
          label: '选项7'
        }
      ],
      value: '选项1'
    }
  }
}
</script>
```

### 加载中

设置 `loading` 属性。

```html
<jm-picker-view :columns="columns" loading />
```

### 多列

`columns` 属性设置为二维数组，`v-model` 为数组。

```html
<jm-picker-view :columns="columns" v-model="value" />

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
<jm-picker-view :columns="columns" v-model="value" :column-change="onChangeDistrict" />

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
      value: ['110000', '110100', '110102']
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

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 选项值修改时触发 | 单列: picker实例, 选中项值, 选中项下标; 多列: picker实例, 所有列选中项值, 当前列的下标 |

### Methods

| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| getLabels | 获取所有列选中项的文本，返回值为一个数组
| getColumnIndex | 获取某一列的选中项下标 | columnIndex |
| getColumnData | 获取某一列的选项 | columnIndex |
| setColumnData | 设置某一列的选项 | columnIndex, values |
