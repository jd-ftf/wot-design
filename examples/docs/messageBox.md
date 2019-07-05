## MessageBox 弹框

弹框有三种：alert、confirm 和 prompt。

弹框支持使用JS直接弹出弹框，也支持组件引用的方式。

### 按需引入

```javascript
import Vue from 'vue'
import { MessageBox } from 'jm-design'

Vue.use(MessageBox)
```

### Alert 弹框

alert 弹框只有确定按钮，用于强提醒。

```html
<jm-button type="primary" plain @click="alert">alert</jm-button>

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
<jm-button type="primary" plain @click="alert">alert</jm-button>

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
<jm-button type="primary" plain @click="alert">alert</jm-button>

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
<jm-button type="primary" plain @click="confirm">confirm</jm-button>

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
<jm-button type="primary" plain @click="prompt">prompt</jm-button>

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

如果提供的弹框内容不满足需求，可以使用 `jm-message-box` 组件，自定义弹框内容。

```html
<jm-message-box :show="isShow" show-cancel-button @action="handleAction" title="评分">
  <jm-rate v-model="rate" />
</jm-message-box>

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

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| title      |	标题                        |	string    |	-'   |	-'  |
| msg	    | 消息，支持html渲染                      |	string    |	-         |	- |
| type      | 弹框类型                      | string    | 'alert', 'confirm', 'prompt'          | 'alert'   |
| closeOnClickModal      | 是否支持点击蒙层进行关闭，点击蒙层回调传入的action为空    | boolean    | -          | true   |
| inputType      | 当type为prompt时，输入框类型   | string    | -          | 'text'   |
| inputValue      | 当type为prompt时，输入框初始值   | string / number    | -          | -   |
| inputPlaceholder      | 当type为prompt时，输入框placeholder      | string    | -          | -   |
| inputPattern      | 当type为prompt时，输入框正则校验，点击确定按钮时进行校验      | regex    | -          | -   |
| inputValidate      | 当type为prompt时，输入框校验函数，点击确定按钮时进行校验      | function    | -          | -   |
| confirmButtonText      | 确定按钮文案      | string    | -          | '确定'   |
| cancelButtonText      | 取消按钮文案     | string    | -          | '取消'   |

### MessageBox 组件调用

#### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| title      |	标题                        |	string    |	-'   |	-'  |
| show-cancel-button	    | 是否显示取消按钮                      |	boolean    |	-         |	false |
| show      | 是否显示弹框                      | boolean    | -          | false   |
| closeOnClickModal      | 是否支持点击蒙层进行关闭，点击蒙层回调传入的action是'cancel'     | boolean    | -          | true   |
| confirmButtonText      | 确定按钮文案      | string    | -          | '确定'   |
| cancelButtonText      | 取消按钮文案     | string    | -          | '取消'   |
