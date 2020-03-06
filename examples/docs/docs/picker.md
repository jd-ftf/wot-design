## Picker 选择器视图

Picker 组件为 popup 和 pickerView 的组合。

### 按需引入

```javascript
import Vue from 'vue'
import { Picker } from 'wot-design'

Vue.use(Picker)
```

### 基本用法

`columns` 设置数据源，`label` 设置左侧文本内容，`v-model` 设置选中项的值。

```html
<wd-picker :columns="columns1" label="单列选项" v-model="value"></wd-picker>

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
<wd-picker :columns="columns" label="禁用" v-model="value" disabled></wd-picker>

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
<wd-picker :columns="columns" label="只读" v-model="value" readonly></wd-picker>
```

### 加载中

设置 `loading` 属性。

```html
<wd-picker-view :columns="columns" loading></wd-picker-view>
```

### 多列

`columns` 属性设置为二维数组，`v-model` 为数组。

```html
<wd-picker :columns="columns" label="多列" v-model="value"></wd-picker>

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

传入 `column-change` 属性，其类型为 `function`，接收 pickerView 实例、当前选中项、当前修改列的下标、resolve 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 `setColumnData` 方法修改其他列的数据源，当修改完成后需要执行 `resolve()` 告知组件修改完成以继续执行，如果 `column-change` 包含异步操作，也可以使组件按照异步顺序进行执行。

> resolve 参数为 1.4.0 添加，每次修改完后都需要调用 resolve() 通知组件。

```html
<wd-picker :columns="columns" label="多列联动" v-model="value" :column-change="onChangeDistrict" />

<script>
const district = {
  '0': [{ label: '北京', value: '110000' }, { label: '广东省', value: '440000' }],
  '110000': [{ label: '北京', value: '110100' }],
  '440000': [{ label: '广州市', value: '440100' }, { label: '韶关市', value: '440200' }, { label: '深圳市', value: '440300' }, { label: '珠海市', value: '440400' }, { label: '汕头市', value: '440500' }],
  '110100': [{ label: '东城区', value: '110101' }, { label: '西城区', value: '110102' }, { label: '朝阳区', value: '110105' }, { label: '丰台区', value: '110106' }, { label: '石景山区', value: '110107' }],
  '440100': [{ label: '荔湾区', value: '440103' }, { label: '越秀区', value: '440104' }, { label: '海珠区', value: '440105'}],
  '440200': [{ label: '武江区', value: '440203'}],
  '440300': [{ label: '罗湖区', value: '440303' }, { label: '福田区', value: '440304' }],
  '440400': [{ label: '香洲区', value: '440402' }, { label: '斗门区', value: '440403' }, { label: '金湾区', value: '440404' }],
  '440500': [{ label: '龙湖区', value: '440507' }, { label: '金平区', value: '440511' }]
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
    onChangeDistrict (pickerView, item, columnIndex, resolve) {
      if (columnIndex === 0) {
        pickerView.setColumnData(1, district[item.value])
        pickerView.setColumnData(2, district[district[item.value][0].value])
        return
      }
      if (columnIndex === 1) {
        pickerView.setColumnData(2, district[item.value])
      }
      resolve()
    }
  }
}
</script>
```

### 值展示格式化

设置 `display-format` 属性，其类型为 `function`，接收当前选中项（数组，单项选择也是数组，数组成员的格式同columns数组成员的格式），返回要展示的字符串。

```html
<wd-picker :columns="columns" label="展示格式化" v-model="value" :display-format="displayFormat"></wd-picker>

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
  },
  methods: {
    displayFormat (items) {
      return items.join('-')
    }
  }
}
</script>
```

### 选择器大小

通过设置 `size` 修改选择器大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-picker label="单列选项" size="large" v-model="value" :columns="columns" />
```

### 错误状态

设置 `error` 属性，选择器的值显示为红色。

```html
<wd-picker label="单列选项" error v-model="value" :columns="columns" />
```

### 值靠右展示

设置 `align-right` 属性，选择器的值靠右展示。

```html
<wd-picker label="单列选项" align-right v-model="value" :columns="columns" />
```

### 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入 `value` 和 `resolve` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭 `picker`弹窗。

```html
<wd-picker :columns="columns" label="before-confirm" v-model="value" :loading="isLoading" :before-confirm="beforeConfirm" />

<script>
export default {
  data () {
    return {
      columns: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
      value: '',
      isLoading: false
    }
  },
  methods: {
    beforeConfirm (value, resolve) {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        if (['选项2', '选项3'].indexOf(value) > -1) {
          resolve(false)
          this.$toast('选项校验不通过，请重新选择')
        } else {
          resolve(true)
        }
      }, 2000)
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
| column-change | 接收 pickerView 实例、选中项、当前修改列的下标、resolve 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 `setColumnData` 方法修改其他列的数据源。 | function | - | - |
| size | 设置选择器大小 | string | 'large' | - |
| label-width | 设置左侧标题宽度 | string | - | '33%' |
| error | 是否为错误状态，错误状态时右侧内容为红色 | boolean | - | false |
| align-right | 选择器的值靠右展示 | boolean | - | false |
| before-confirm | 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数 | function | - | - |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| confirm | 点击右侧按钮触发 | - |
| cancel | 点击左侧按钮触发 | - |
