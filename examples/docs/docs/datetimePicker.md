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

<!-- TODO 需判定是否需要 -->
### 校验标志

通过设置 `required` 开启label左侧校验标志。

```html
<wd-datetime-picker label="日期选择" required v-model="value" />
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

### 唤起项插槽

设置默认插槽修改唤起picker组件的形式。

```html
<wd-datetime-picker v-model="value">
  <wd-button>插槽唤起</wd-button>
</wd-datetime-picker>
```

### 时间范围选择

当 `value` 为 `Array` 类型, 时间范围选择开启。

```html
<wd-datetime-picker v-model="value" label="时间范围选择"></wd-datetime-picker>
<script>
export default {
  data () {
    return {
      value: [
        new Date(2012, 10, 10, 10, 10),
        new Date(2013, 10, 11, 10, 10)
      ]
    }
  }
}
</script>
```

### 范围选择tab标签展示格式

给 `display-format-tab-label` 属性传入一个函数，接收所有选中项数组，返回展示的文本内容。

```html
<wd-datetime-picker v-model="value" label="范围tab展示格式" :display-format-tab-label="displayFormatTabLabel"></wd-datetime-picker>
<script>
export default {
  data () {
    return {
      value: [
        new Date(2012, 10, 10, 10, 10),
        new Date(2013, 10, 11, 10, 10)
      ],
      displayFormatTabLabel (items) {
        return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
      }
    }
  }
}
</script>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 选中项，当 type 为 time 时，类型为字符串；当 type 为 Array 时，类型为范围选择；否则为 Date | string / date / Array | - |
| type | 选择器类型 | string | 'date' / 'year-month' / 'time'  | 'datetime' |
| loading | 加载中 | boolean | - | false |
| loading-color | 加载的颜色 | String | - | '#4D80F0' |
| arrow-html | 是否使用html渲染选择器内容 | boolean | - | true |
| columns-height | picker内部滚筒高 | number | - | 217 |
| title | 弹出层标题 | string | - | - |
| cancel-button-text | 取消按钮文案 | string | - | '取消' |
| confirm-button-text | 确认按钮文案 | string | - | '完成' |
| label | 选择器左侧文案 | string | - | - |
| placeholder | 选择器占位符 | string | - | '请选择' |
| disabled | 禁用 | boolean | - | fasle |
| readonly | 只读 | boolean | - | false |
| required | 是否校验 | boolean | - | false |
| teleport | 指定挂载的 HTML 节点, 可以为字符串，也可以为对象，为对象时有 `to` 和 `disabled` 属性，`to` 表示挂载点，`disabled` 表示挂载到当前节点上 | string / object  | - | 'body' |
| display-format | 自定义展示文案的格式化函数，返回一个字符串 | function | - | - |
| display-format-tab-label | 在区域选择模式下，自定义展示tab标签文案的格式化函数，返回一个字符串 | function | - | - |
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
| close-on-click-action | 点击选项后是否关闭菜单 | boolean | - | true |

### Slot

| name      | 说明       |
|------------- |----------- |
| default | 唤起picker的展示形式，不设置则展示cell表单样式 |
| label | cell展示时，左侧展示文案 |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| confirm | 点击右侧按钮触发 | 确认选中得到的当前picker选中的值 |
| cancel | 点击左侧按钮触发 | - |
| toggle | 在区域选择模式下，tab标签切换时触发 | 切换到当前picker选中的值 |

### Methods

| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| open | 打开picker弹框 |
| close | 关闭picker弹框 |
