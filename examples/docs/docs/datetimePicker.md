## DatetimePicker 日期时间选择器

为 Picker 组件的封装，在其内部构建好日期时间选项。

### 按需引入

```javascript
import Vue from 'vue'
import { DatetimePicker } from 'wot-design'

Vue.use(DatetimePicker)
```

### 基本用法

`v-model` 设置绑定值，默认为 'datetime' 类型，展示年月日时分，绑定值为 `Date` 类型，如果为 'time' 类型，绑定值为字符串。

```html
<wd-datetime-picker v-model="value" label="日期选择"></wd-datetime-picker>

<script>
export default {
  data () {
    return {
      value: new Date()
    }
  }
}
</script>
```

### date 类型

'date' 类型只展示年月日。

```html
<wd-datetime-picker type="date" v-model="value" label="年月日"></wd-datetime-picker>

<script>
export default {
  data () {
    return {
      value2: ''
    }
  }
}
</script>
```

### year-month 类型

'year-month' 类型只展示年月。

```html
<wd-datetime-picker type="year-month" v-model="value" label="年月"></wd-datetime-picker>

<script>
export default {
  data () {
    return {
      value: new Date()
    }
  }
}
</script>
```

### time 类型

'time' 类型只展示时分。

```html
<wd-datetime-picker type="time" v-model="value" label="时分"></wd-datetime-picker>

<script>
export default {
  data () {
    return {
      value: '09:20'
    }
  }
}
</script>
```

### 修改展示格式

给 `display-format` 属性传入一个函数，接收所有选中项数组，返回展示的文本内容。

```html
<wd-datetime-picker v-model="value" label="展示格式" :display-format="displayFormat"></wd-datetime-picker>

<script>
export default {
  data () {
    return {
      value: new Date(),
      displayFormat (items) {
        return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
      }
    }
  }
}
</script>
```

### 修改弹出层内部格式

给 `formatter` 属性传入一个函数，接收 `type` 和 `value` 值，返回展示的文本内容。`type` 有 `year`、`month`、`date`、`hour`、`minute` 类型，`value` 为 `number` 类型。

```html
<wd-datetime-picker v-model="value" label="内部格式" :formatter="formatter"></wd-datetime-picker>

<script>
export default {
  data () {
    return {
      value: new Date(),
      formatter (type, value) {
        switch (type) {
          case 'year':
            return value + '年'
          case 'month':
            return value + '月'
          case 'date':
            return value + '日'
          case 'hour':
            return value + '时'
          case 'minute':
            return value + '分'
          default:
            return value
        }
      }
    }
  }
}
</script>
```

### 过滤选项

给 `filter` 属性传入一个函数，接收 `type` 和 `values` 值，返回列的选项列表。`type` 有 `year`、`month`、`date`、`hour`、`minute` 类型，`values` 为 number数组。

```html
<wd-datetime-picker v-model="value" label="过滤选项" :filter="filter"></wd-datetime-picker>

<script>
export default {
  data () {
    return {
      value: '',
      filter (type, values) {
        if (type === 'minute') {
          return values.filter(value => value % 5 === 0)
        }

        return values
      }
    }
  }
}
</script>
```

### 选择器大小

通过设置 `size` 修改选择器大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-datetime-picker label="日期选择" size="large" v-model="value" />
```

### 错误状态

设置 `error` 属性，选择器的值显示为红色。

```html
<wd-datetime-picker label="日期选择" error v-model="value" />
```

### 值靠右展示

设置 `align-right` 属性，选择器的值靠右展示。

```html
<wd-datetime-picker label="日期选择" align-right v-model="value" />
```

### 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入 `value`(time 类型为字符串，其他为 Date 类型) 和 `resolve` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭 `datetimePicker`弹窗。

```html
<wd-datetime-picker v-model="value" label="before-confirm" :before-confirm="beforeConfirm" />

<script>
export default {
  data () {
    return {
      value: new Date()
    }
  },
  methods: {
    beforeConfirm (value, resolve) {
      if (value.getTime() > Date.now()) {
        resolve(false)
        this.$toast.error('不能选择大于今天的日期')
      } else {
        resolve(true)
      }
    }
  }
}
</script>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 选中项，当 type 为 time 时，类型为字符串，否则为 Date | string / date | - |
| type | 选择器类型 | string | 'date' / 'year-month' / 'time' | 'datetime' |
| loading | 加载中 | boolean | - | false |
| arrow-html | 是否使用html渲染选择器内容 | boolean | - | true |
| visible-item-count | 展示的行数 | number | - | 7 |
| item-height | 选项高度 | number | - | 33 |
| title | 弹出层标题 | string | - | - |
| cancel-button-text | 取消按钮文案 | string | - | '取消' |
| confirm-button-text | 确认按钮文案 | string | - | '完成' |
| label | 选择器左侧文案 | string | - | - |
| placeholder | 选择器占位符 | string | - | '请选择' |
| disabled | 禁用 | boolean | - | fasle |
| readonly | 只读 | boolean | - | false |
| display-format | 自定义展示文案的格式化函数，返回一个字符串 | function | - | - |
| formatter | 自定义弹出层选项文案的格式化函数，返回一个字符串 | function | - | - |
| filter | 自定义过滤选项的函数，返回列的选项数组 | function | - | - |
| minDate | 最小日期 | date | - | 当前日期 - 10年 |
| maxDate | 最大日期 | date | - | 当前日志 + 10年 |
| minHour | 最小小时 | number | - | 0 |
| maxHour | 最大小时 | number | - | 23 |
| minMinute | 最小分钟 | number | - | 0 |
| maxMinute | 最大分钟 | number | - | 59 |
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

### Slot

| name      | 说明       |
|------------- |----------- |
| label | 左侧标题插槽 |
