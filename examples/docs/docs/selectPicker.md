## SelectPicker 单复选选择器

### 按需引入

```javascript
import Vue from 'vue'
import { SelectPicker } from 'wot-design'

Vue.use(SelectPicker)
```

### 基本用法

`label` 设置左侧文本内容；

`columns` 设置数据源，为二维数组，每一列为一个一维数组，每个选项包含 `value`(选项值) 和 `label`(选项名称)。

`v-model` 设置选中项的值，数据类型为 `Array` | `String` `Number` 或 `Boolean`；

```html
<wd-select-picker label="基本用法" v-model="value" :columns="columns"></wd-select-picker>

<script>
export default {
  data () {
    return {
      columns1: [
        {
          value: '1',
          label: '京麦'
        },
        {
          value: '2',
          label: '京东金融'
        },
        {
          value: '3',
          label: '京me'
        }
      ],
      value: ['1']
    }
  }
}
</script>
```

### 类型切换

`type` 默认值为 `checkbox`， 为默认值时，value值类型为 `Array` 类型

设置 `type` 值为 `radio` ，开启单选类型，value值类型为 `String` `Number` 或 `Boolean`。

```html
<wd-select-picker label="类型切换" v-model="value" :columns="columns" type="radio"></wd-select-picker>

<script>
export default {
  data () {
    return {
      columns1: [
        {
          value: '1',
          label: '京麦'
        },
        {
          value: '2',
          label: '京东金融'
        },
        {
          value: '3',
          label: '京me'
        }
      ],
      value: '1'
    }
  }
}
</script>
```

### 禁用

设置 `disabled` 属性。

```html
<wd-select-picker label="禁用" v-model="value" :columns="columns" disabled></wd-select-picker>
```

### 只读

设置 `readonly` 属性。

```html
<wd-select-picker label="只读" v-model="value" :columns="columns" readonly></wd-select-picker>
```

### 禁用选项

`columns` 每个选项支持 `disabled` 属性。

```html
<wd-select-picker label="禁用选项" v-model="value" :columns="columns"></wd-select-picker>

<script>
export default {
  data () {
    return {
      columns: [
        {
          value: '1',
          label: '京麦',
          disabled: true
        },
        {
          value: '2',
          label: '京东金融'
        },
        {
          value: '3',
          label: '京me'
        }
      ],
      value: ['1']
    }
  }
}
</script>
```

### 展示格式化

设置 `display-format` 属性，其类型为 `function`，接收当前选中项（当类型`checkbox`时 参数是 数组类型，类型为`radio` 时参数是 `String` `Number` 或 `Boolean` 类型），返回要展示的字符串。

```html
<wd-select-picker label="展示格式化" v-model="value" :columns="columns" :display-format="displayFormat"></wd-select-picker>

<script>
export default {
  data () {
    return {
      columns1: [
        {
          value: '1',
          label: '京麦'
        },
        {
          value: '2',
          label: '京东金融'
        },
        {
          value: '3',
          label: '京me'
        }
      ],
      value: ['1']
    }
  },
  methods: {
    displayFormat (items) {
      let showValue = ''
      this.columns1.forEach(column => {
        items.forEach((item, index) => {
          if (column.value === item) {
            showValue += `${item}: ${column.label} ${index + 1 < items.length ? '--' : ''} `
          }
        })
      })
      return showValue
    }
  }
}
</script>
```

### 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入`value`(选中项 也就是当前选择的值） 和 `resolve` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭弹窗。

```html
<wd-select-picker label="确定前校验" v-model="value" :columns="columns" :before-confirm="beforeConfirm"></wd-select-picker>

<script>
export default {
    data () {
    return {
      columns1: [
        {
          value: '1',
          label: '京麦'
        },
        {
          value: '2',
          label: '京东金融'
        },
        {
          value: '3',
          label: '京me'
        }
      ],
      value: ['1']
    }
  },
  methods: {
    beforeConfirm (value, resolve) {
      if (value.length > 2) {
        this.$toast.warning('最多只能选择两款产品')
        resolve(false)
      } else {
        resolve(true)
      }
    }
  }
}
</script>
```

### 设置标题

设置 `title` 属性，修改弹出层的标题。

```html
<wd-select-picker label="标题" v-model="value" :columns="columns" title="多选"></wd-select-picker>
```

### 错误状态

设置 `error` 属性，选择器的值显示为红色。

```html
<wd-select-picker label="错误" v-model="value" :columns="columns" error></wd-select-picker>
```

### 必填样式

设置 `required` 属性，展示必填样式。

```html
<wd-select-picker label="必填" v-model="value" :columns="columns" required></wd-select-picker>
```

### 选择器大小

通过设置 `size` 修改选择器大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-select-picker label="大尺寸" v-model="value" :columns="columns" size="large"></wd-select-picker>
```

### 值靠右展示

设置 `align-right` 属性，选择器的值靠右展示。

```html
<wd-select-picker label="值靠右展示" v-model="value" :columns="columns" align-right></wd-select-picker>
```

### 自定义选择器

如果默认的 cell 类型的展示格式不满足需求，可以通过默认插槽进行自定义选择器样式。

```html
<div class="text">当前选中项：<span>{{value}}</span></div>
<wd-select-picker v-model="value" :columns="columns">
  <wd-button>默认唤起项</wd-button>
</wd-select-picker>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 选中项，`type`类型为`checkbox`时，类型为 array；`type`为`radio` 时 ，类型为 number / boolean / string | array / number / boolean / string | - | - |
| columns | 选择器数据，一维数组 | array | - | - |
| type | 单复选picker类型 | string | checkbox / radio | 'checkbox' |
| value-key | 选项对象中，value对应的 key | string | - | 'value' |
| label-key | 选项对象中，展示的文本对应的 key | string | - | 'label' |
| title | 弹出层标题 | string | - | - |
| label | 选择器左侧文案 | string | - | - |
| placeholder | 选择器占位符 | string | - | '请选择' |
| disabled | 禁用 | boolean | - | fasle |
| loading | 加载中 | boolean | - | false |
| loading-color | 加载的颜色 | String | - | '#4D80F0' |
| readonly | 只读 | boolean | - | false |
| display-format | 自定义展示文案的格式化函数，返回一个字符串 | function | - | - |
| confirm-button-text | 确认按钮文案 | string | - | '确认' |
| size | 设置选择器大小 | string | 'large' | - |
| label-width | 设置左侧标题宽度 | string | - | '33%' |
| error | 是否为错误状态，错误状态时右侧内容为红色 | boolean | - | false |
| required | 必填样式 | boolean | - | false |
| align-right | 选择器的值靠右展示 | boolean | - | false |
| before-confirm | 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数 | function | - | - |
| select-size | 设置picker内部的选项组尺寸大小 （单/复选框） | string | 'large' | - |
| min | 最小选中的数量（仅在复选框类型下生效，`type`类型为`checkbox`） | number | - | 0 |
| max | 最大选中的数量，0 为无限数量，默认为 0（仅在复选框类型下生效，`type`类型为`checkbox`） | number | - | 0 |
| checked-color | 选中的颜色（单/复选框） | string | - | '#4D80F0' |
| teleport | 指定挂载的 HTML 节点, 可以为字符串，也可以为对象，为对象时有 `to` 和 `disabled` 属性，`to` 表示挂载点，`disabled` 表示挂载到当前节点上 | string / object  | - | 'body' |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | 

### 选项数据结构

| 键名 | 说明 | 类型 | 是否必填 |
|----- |----- |----- | ----- |
| value | 选项值 | string | 是 |
| label | 选项名 | string | 是 |
| disabled | 禁用选项 | boolean | 否 |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| confirm | 点击确认时触发 | - |
| change | picker内选项更改时触发 | value(选项值) |
| cancel | 点击关闭按钮或者蒙层时触发 | - |

### Methods

| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| open | 打开picker弹框 |
| close | 关闭picker弹框 |

### Slots

| 插槽名称      | 说明       |
|------------- |----------- |
| default | 自定义展示 |
| label | 左侧插槽 |
