## MessageBox 弹框

弹框有三种：alert、confirm 和 prompt。

弹框支持使用JS直接弹出弹框，也支持组件引用的方式。

### 按需引入

```javascript
import Vue from 'vue'
import { MessageBox } from 'wot-design'

Vue.use(MessageBox[, options])
```

options 为一个对象，不传入则使用默认配置，其参数为：

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| messageBoxKey | MessageBox 弹窗组件在 `Vue.prototype` 原型上的属性名 | string | - | $messageBox | 2.3.0 |

### Alert 弹框

alert 弹框只有确定按钮，用于强提醒。

```html
<wd-button plain @click="alert">alert</wd-button>

<script>
export default {
  methods: {
    alert () {
      this.$messageBox.alert('操作成功')
    }
  }
}
</script>
```

显示标题的 alert 弹框。

```html
<wd-button plain @click="alert">alert</wd-button>

<script>
export default {
  methods: {
    alert () {
      this.$messageBox.alert('提示文案', '标题')
    }
  }
}
</script>
```

如果内容文案过长，弹框高度不再增加，而是展示滚动条。

```html
<wd-button plain @click="alert">alert</wd-button>

<script>
export default {
  methods: {
    alert () {
      this.$messageBox.alert('以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文', '标题')
    }
  }
}
</script>
```

### Confirm 弹框

用于提示用户操作。

```html
<wd-button plain @click="confirm">confirm</wd-button>

<script>
export default {
  methods: {
    confirm () {
      this.$messageBox.confirm('是否删除', '提示').then(() => {
        this.$messageBox.alert('删除成功')
      })
    }
  }
}
</script>
```

### Prompt 弹框

prompt 会展示一个输入框，并可以进行输入校验。

```html
<wd-button plain @click="prompt">prompt</wd-button>

<script>
export default {
  methods: {
    confirm () {
      this.$messageBox.prompt('请输入邮箱', {
        inputPattern: /.+@.+\..+/i
      }).then(({ value }) => {
        this.$messageBox.alert(`你输入的邮箱是： ${value}`)
      })
    }
  }
}
</script>
```

### 组件引用

如果提供的弹框内容不满足需求，可以使用 `wd-message-box` 组件，自定义弹框内容。

```html
<wd-message-box :show="isShow" show-cancel-button @action="handleAction" title="评分">
  <wd-rate v-model="rate" />
</wd-message-box>

<script>
export default {
  data () {
    return {
      isShow: false,
      rate: 0
    }
  },
  methods: {
    handleAction (action) {
      this.isShow = false
      if (action === 'confirm') {
        this.$messageBox.alert(`你的评分为：${this.rate}分`)
      }
    }
  }
}
</script>
```

---

弹框在点击确定和取消按钮时，会触发回调函数callback，并传入action（'confirm'或'cancel')，你也可以使用 Promise，用 then 接收“确定”按钮事件，用 catch 接收“取消”按钮事件。

`this.$messageBox(options[, callback])` 在调用时，需传入 options 参数和 callback（可选） 回调函数，alert、confirm 和 prompt 都支持快捷调用：

```javascript
this.$messageBox(options, callback) // 如果第一个参数为字符串，则支持这样的写法：this.$messageBox(title, msg, type)

this.$messageBox.alert(msg, title, options) // title 可以跳过不写，即支持写法：this.$messageBox.alert(msg, options)

this.$messageBox.confirm(msg, title, options) // title 可以跳过不写，即支持写法：this.$messageBox.confirm(msg, options)

this.$messageBox.prompt(title, options) //  title 可以跳过不写，即支持写法：this.$messageBox.prompt(options)
```

### MessageBox JS 调用

#### Options Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| title | 标题 | string | -  | - | - |
| msg | 消息，支持html渲染 | string | - | - | - |
| type | 弹框类型 | string | alert / confirm / prompt | alert | - |
| closeOnClickModal | 是否支持点击蒙层进行关闭，点击蒙层回调传入的action为'modal' | boolean | - | true | - |
| closeOnPopstate | 页面返回时自动关闭 | boolean | - | true | - |
| inputType | 当type为prompt时，输入框类型 | string | - | text | - |
| inputValue | 当type为prompt时，输入框初始值 | string / number | - | -   | - |
| inputPlaceholder | 当type为prompt时，输入框placeholder | string | - | - | - |
| inputPattern | 当type为prompt时，输入框正则校验，点击确定按钮时进行校验 | regex | - | - | - |
| inputError | 当type为prompt时，输入框检验不通过时的错误提示文案 | string | - | - | - |
| inputValidate | 当type为prompt时，输入框校验函数，点击确定按钮时进行校验 | function | - | - | - |
| confirmButtonText | 确定按钮文案 | string | - | 确定 | - |
| cancelButtonText | 取消按钮文案 | string | - | 取消 | - |

### MessageBox 组件调用

#### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| title | 标题 | string | - | - | - |
| show-cancel-button | 是否显示取消按钮 | boolean | - | false | - |
| show | 是否显示弹框 | boolean | - | false | - |
| close-on-click-modal | 是否支持点击蒙层进行关闭，点击蒙层回调传入的action是'modal' | boolean | - | true | - |
| close-on-popstate | 页面返回时自动关闭 | boolean | - | true | - |
| confirm-button-text | 确定按钮文案 | string | - | 确定 | - |
| cancel-button-text | 取消按钮文案 | string | - | 取消 | - |
| teleport | 指定挂载的 HTML 节点, 可以为字符串，也可以为对象，为对象时有 `to` 和 `disabled` 属性，`to` 表示挂载点，`disabled` 表示挂载到当前节点上 | string / object  | - | body | - |

#### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| open | 当弹窗打开时触发 | - | - |
| opened | 当弹窗完全打开时触发 | - | - |
| close | 当弹窗关闭时触发 | - | - |
| closed | 当弹窗完全关闭时触发 | - | - |
| action | 当点击蒙层（modal）、取消按钮（cancel）、确定按钮（confirm）时触发 | modal / cancel / confirm | - |
