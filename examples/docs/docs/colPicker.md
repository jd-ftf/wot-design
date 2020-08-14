## ColPicker 多列选择器

使用多列选择器来做级联，交互效果较好，多列选择器支持无限级选择。

### 按需引入

```javascript
import Vue from 'vue'
import { ColPicker } from 'wot-design'

Vue.use(ColPicker)
```

### 基本用法

`label` 设置左侧文本内容；

`columns` 设置数据源，为二维数组，每一列为一个一维数组，每个选项包含 `value`(选项值) 和 `label`(选项名称)。

`v-model` 设置选中项的值，数据类型为数组；

传入 `column-change` 属性，其类型为 `function`，接收参数 options: object；options 的结构如下：

| 参数      | 类型 | 说明                                 |
|---------- |---- |---------- |
| selectedItem | object | 当前列的选中项，数据结构跟 columns 中选项的数据结构一致 |
| index | number | 当前列的下标 |
| resolve | function | 接收下一列的选项数组 |
| finish | function | 结束 picker 选择，若无法正常关闭如数据获取失败，则执行 `finish(false)` |

```html
<wd-col-picker label="选择地址" v-model="value" :columns="areaData" :column-change="columnChange"></wd-col-picker>

<script>
// 使用的是 `china-area-data` 库，包含国内最新的地区编码
import areaData from 'china-area-data'

export default {
  data () {
    return {
      value: [],
      areaData: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key]
        }
      })],
      columnChange ({ selectedItem, resolve, finish }) {
        if (areaData[selectedItem.value]) {
          resolve(Object.keys(areaData[selectedItem.value]).map(key => {
            return {
              value: key,
              label: areaData[selectedItem.value][key]
            }
          }))
        } else {
          finish()
        }
      }
    }
  }
}
</script>
```

### 异步加载

一般column-change是个异步获取数据的操作，触发column-change组件会有默认loading，数据响应后关闭loading。

异步请求数据失败，则调用 `finish(false)`。

```html
<wd-col-picker label="选择地址" v-model="value" :columns="areaData" :column-change="columnChange"></wd-col-picker>

<script>
// 使用的是 `china-area-data` 库，包含国内最新的地区编码
import areaData from 'china-area-data'

export default {
  data () {
    return {
      value: [],
      areaData: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key]
        }
      })],
      columnChange ({ selectedItem, resolve, finish }) {
        // 模拟异步请求
        setTimeout(() => {
          // 模拟请求失败
          if (Math.random() > 0.7) {
            finish(false)
            this.$toast.error('数据请求失败，请重试')
            return
          }
          if (areaData[selectedItem.value]) {
            resolve(Object.keys(areaData[selectedItem.value]).map(key => {
              return {
                value: key,
                label: areaData[selectedItem.value][key]
              }
            }))
          } else {
            // 没有下一项时，执行完成
            finish()
          }
        }, 300)
      }
    }
  }
}
</script>
```

### 初始选项

设置初始选项时，`columns` 的数组长度应与 `value` 的数组长度一致，`value` 每一列的值必须对应可以在 `columns` 中找到。

```html
<wd-col-picker label="选择地址" v-model="value" :columns="areaData" :column-change="columnChange"></wd-col-picker>

<script>
// 使用的是 `china-area-data` 库，包含国内最新的地区编码
import areaData from 'china-area-data'

export default {
  data () {
    return {
      value: ['150000', '150100', '150121'],
      areaData: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key]
        }
      }), Object.keys(areaData[150000]).map(key => {
        return {
          value: key,
          label: areaData[150000][key]
        }
      }), Object.keys(areaData[150100]).map(key => {
        return {
          value: key,
          label: areaData[150100][key]
        }
      })],
      columnChange ({ selectedItem, resolve, finish }) {
        if (areaData[selectedItem.value]) {
          resolve(Object.keys(areaData[selectedItem.value]).map(key => {
            return {
              value: key,
              label: areaData[selectedItem.value][key]
            }
          }))
        } else {
          finish()
        }
      }
    }
  }
}
</script>
```

### 禁用

设置 `disabled` 属性。

```html
<wd-col-picker label="禁用" disabled v-model="value" :columns="areaData" :column-change="columnChange"></wd-col-picker>
```

### 只读

设置 `readonly` 属性。

```html
<wd-col-picker label="禁用" readonly v-model="value" :columns="areaData" :column-change="columnChange"></wd-col-picker>
```

### 禁用选项

`columns` 每个选项支持 `disabled` 属性。

```html
<wd-col-picker label="选择地址" v-model="value" :columns="areaData" :column-change="columnChange"></wd-col-picker>

<script>
// 使用的是 `china-area-data` 库，包含国内最新的地区编码
import areaData from 'china-area-data'

export default {
  data () {
    return {
      value: [],
      areaData: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key],
          disabled: key === '140000' // 将某个选项设置禁用
        }
      })],
      columnChange ({ selectedItem, resolve, finish }) {
        if (areaData[selectedItem.value]) {
          resolve(Object.keys(areaData[selectedItem.value]).map(key => {
            return {
              value: key,
              label: areaData[selectedItem.value][key]
            }
          }))
        } else {
          finish()
        }
      }
    }
  }
}
</script>
```

### 选项提示信息

`columns` 每个选项支持 `tip` 属性。

```html
<wd-col-picker label="选择地址" v-model="value" :columns="areaData" :column-change="columnChange"></wd-col-picker>

<script>
// 使用的是 `china-area-data` 库，包含国内最新的地区编码
import areaData from 'china-area-data'

export default {
  data () {
    return {
      value: [],
      areaData: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key],
          tip: key === '150000' ? '该地区配送时间可能较长' : ''
        }
      })],
      columnChange ({ selectedItem, resolve, finish }) {
        if (areaData[selectedItem.value]) {
          resolve(Object.keys(areaData[selectedItem.value]).map(key => {
            return {
              value: key,
              label: areaData[selectedItem.value][key]
            }
          }))
        } else {
          finish()
        }
      }
    }
  }
}
</script>
```

### 展示格式化

设置 `display-format` 属性，其类型为 `function`，接收当前选中项（数组，数组成员的格式同columns数组成员的格式），返回要展示的字符串。

```html
<wd-col-picker label="展示格式化" v-model="value" :columns="areaData" :column-change="columnChange" :display-format="displayFormat"></wd-col-picker>

<script>
// 使用的是 `china-area-data` 库，包含国内最新的地区编码
import areaData from 'china-area-data'

export default {
  data () {
    return {
      value: ['130000', '130200', '130204'],
      areaData: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key]
        }
      }), Object.keys(areaData[130000]).map(key => {
        return {
          value: key,
          label: areaData[130000][key]
        }
      }), Object.keys(areaData[130200]).map(key => {
        return {
          value: key,
          label: areaData[130200][key]
        }
      })],
      columnChange ({ selectedItem, resolve, finish }) {
        if (areaData[selectedItem.value]) {
          resolve(Object.keys(areaData[selectedItem.value]).map(key => {
            return {
              value: key,
              label: areaData[selectedItem.value][key]
            }
          }))
        } else {
          finish()
        }
      },
      displayFormat (selectedItems) {
        return selectedItems[selectedItems.length - 2].label + '-' + selectedItems[selectedItems.length - 1].label
      }
    }
  }
}
</script>
```

### 设置标题

设置 `title` 属性，修改弹出层的标题。

```html
<wd-col-picker label="标题" v-model="value" title="选择地址" :columns="areaData" :column-change="columnChange"></wd-col-picker>
```

### 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入 `value`、`selectedItems`(选中项数组，数据结构同columns每一列的选项) 和 `resolve` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭弹窗。

```html
<wd-col-picker label="before-confirm" v-model="value" :columns="areaData" :column-change="columnChange" :before-confirm="beforeConfirm"></wd-col-picker>

<script>
// 使用的是 `china-area-data` 库，包含国内最新的地区编码
import areaData from 'china-area-data'

export default {
  data () {
    return {
      value: [],
      areaData: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key]
        }
      })],
      columnChange ({ selectedItem, resolve, finish }) {
        if (areaData[selectedItem.value]) {
          resolve(Object.keys(areaData[selectedItem.value]).map(key => {
            return {
              value: key,
              label: areaData[selectedItem.value][key]
            }
          }))
        } else {
          finish()
        }
      },
      beforeConfirm (value, selectedItems, resolve) {
        if (parseInt(value[2]) > 120000) {
          this.$toast('该地区库存不足')
          resolve(false)
        } else {
          resolve(true)
        }
      }
    }
  }
}
</script>
```


### 错误状态

设置 `error` 属性，选择器的值显示为红色。

```html
<wd-col-picker label="选择地址" v-model="value" error :columns="areaData" :column-change="columnChange"></wd-col-picker>
```

### 必填样式

设置 `required` 属性，展示必填样式。

```html
<wd-col-picker label="必填" required v-model="value" :columns="areaData" :column-change="columnChange" />
```

### 选择器大小

通过设置 `size` 修改选择器大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-col-picker label="选择地址" v-model="value" size="large" :columns="areaData" :column-change="columnChange"></wd-col-picker>
```

### 值靠右展示

设置 `align-right` 属性，选择器的值靠右展示。

```html
<wd-col-picker label="选择地址" align-right v-model="value" :columns="areaData" :column-change="columnChange"></wd-col-picker>
```

### 自定义选择器

如果默认的 cell 类型的展示格式不满足需求，可以通过默认插槽进行自定义选择器样式。

```html
<div style="margin-bottom: 10px;">当前选中项: {{ displayValue }}</div>
<wd-col-picker v-model="value" :columns="areaData" :column-change="columnChange" style="display: inline-block;" @confirm="handleConfirm">
  <wd-button type="primary">选择地址</wd-button>
</wd-col-picker>

<script>
// 使用的是 `china-area-data` 库，包含国内最新的地区编码
import areaData from 'china-area-data'

export default {
  data () {
    return {
      value: [],
      displayValue: '',
      areaData: [Object.keys(areaData[86]).map(key => {
        return {
          value: key,
          label: areaData[86][key]
        }
      })],
      columnChange ({ selectedItem, resolve, finish }) {
        if (areaData[selectedItem.value]) {
          resolve(Object.keys(areaData[selectedItem.value]).map(key => {
            return {
              value: key,
              label: areaData[selectedItem.value][key]
            }
          }))
        } else {
          finish()
        }
      }
    }
  },
  methods: {
    handleConfirm (value, selectedItems) {
      this.displayValue = selectedItems.map(item => {
        return item.label
      }).join('')
    }
  }
}
</script>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 选中项 | array | - | - |
| columns | 选择器数据，二维数组 | array | - | - |
| value-key | 选项对象中，value对应的 key | string | - | 'label' |
| label-key | 选项对象中，展示的文本对应的 key | string | - | 'value' |
| tip-key | 选项对象中，提示文案对应的 key | string | - | 'tip' |
| title | 弹出层标题 | string | - | - |
| label | 选择器左侧文案 | string | - | - |
| placeholder | 选择器占位符 | string | - | '请选择' |
| disabled | 禁用 | boolean | - | fasle |
| readonly | 只读 | boolean | - | false |
| display-format | 自定义展示文案的格式化函数，返回一个字符串 | function | - | - |
| column-change | 接收当前列的选中项 item、下一列数据处理函数 resolve、结束选择 finish | function | - | - |
| size | 设置选择器大小 | string | 'large' | - |
| label-width | 设置左侧标题宽度 | string | - | '33%' |
| error | 是否为错误状态，错误状态时右侧内容为红色 | boolean | - | false |
| required | 必填样式 | boolean | - | false |
| align-right | 选择器的值靠右展示 | boolean | - | false |
| before-confirm | 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数 | function | - | - |

### 选项数据结构

| 键名 | 说明 | 类型 | 是否必填 |
|----- |----- |----- | ----- |
| value | 选项值 | string | 是 |
| label | 选项名 | string | 是 |
| tip | 选项提示 | string | 否 |
| disabled | 禁用选项 | boolean | 否 |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| confirm | 最后一列选项选中时触发 | value(选项值数组), selectedItem(选项数组) |
| cancel | 点击关闭按钮或者蒙层时触发 | - |

### Methods

| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| showPicker    | 展示弹窗 | —  |

### Slots

| name      | 说明       |
|------------- |----------- |
| default | 自定义展示 |
| label | 左侧插槽 |
