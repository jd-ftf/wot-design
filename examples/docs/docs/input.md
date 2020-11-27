## Input 输入框

### 按需引入

```javascript
import Vue from 'vue'
import { Input } from 'wot-design'

Vue.use(Input)
```

### 基本用法

`v-model` 为绑定值。

```html
<wd-input v-model="value" placeholder="请输入用户名"></wd-input>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
```

### 禁用

设置 `disabled` 属性。

```html
<wd-input v-model="value" disabled></wd-input>
```

### 只读

设置 `readonly` 属性。

```html
<wd-input v-model="value" readonly></wd-input>
```

### 清空按钮

设置 `clearable` 属性。

```html
<wd-input v-model="value" clearable></wd-input>
```

### 密码输入框

设置 `show-password` 属性。

```html
<wd-input v-model="value" clearable show-password></wd-input>
```

### 前后icon

设置前置icon `prefix-icon`，设置后置icon `suffix-icon`。

```html
<wd-input v-model="value" prefix-icon="wd-icon-person" suffix-icon="wd-icon-tickets" />
```

### 限制字数输入

设置 `maxlength` 属性，如果要显示字数限制，设置 `show-word-limit` 属性。

```html
<wd-input v-model="value" maxlength="20" show-word-limit></wd-input>
```

### 取消底部边框

设置 `no-border` 属性，取消底部边框，同时取消上下间距，方便开发者自定义使用。

```html
<wd-input v-model="value" no-border placeholder="请输入价格" style="display: inline-block; width: 70px; vertical-align: middle;" />
<span style="display: inline-block; vertical-align: middle; font-size: 14px;">元</span>
```

### 文本域

设置 `type` 为 'textarea`。

```html
<wd-input type="textarea" v-model="value" placeholder="请填写评价..."></wd-input>
```

设置清空，字数限制，设置 `rows` 行数。也可以设置 `autosize` ，使文本域高度自动增加。

```html
<wd-input type="textarea" v-model="value" rows="6" maxlength="120" clearable show-word-limit></wd-input>
```

### 普通输入框高度自增加

```html
<wd-input v-model="value" autosize clearable></wd-input>
```

### 设置label标题

设置 `label` 标题，可以和 `cell-group` 组合使用，形成 `cell` 展示类型。可以通过 `label-width` 设置标题宽度，默认为 '33%'。

```html
<wd-input v-model="value" placeholder="请输入..." label="基本用法"></wd-input>
```

### 必填样式

设置了 `label` 的情况下，设置 `required` 属性，展示必填样式。

```html
<wd-input v-model="value" placeholder="请输入..." label="必填" required></wd-input>
```

### 输入框大小

通过设置 `size` 修改输入框大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-input v-model="value" placeholder="请输入..." label="大尺寸" size="large"></wd-input>
```

### 错误状态

设置 `error` 属性，输入框的值显示为红色。

```html
<wd-input v-model="value" placeholder="请输入用户名" error></wd-input>
```

### 垂直居中

当设置 `label` 标题时，默认为顶部居中，设置 `center` 属性可以使标题和输入框垂直居中。

```html
<wd-input v-model="value" placeholder="请输入..." label="基本用法" center></wd-input>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type | 类型 | string | text, textarea, number, email | text |
| value/v-model   |	绑定值                        |	string / number     | -   |	-  |
| placeholder	    | 占位文本                  |	string    |	-         |	'搜索' |
| clearable | 显示清空按钮 | boolean | - | false |
| maxlength | 原生属性，最大长度 | string | - | - |
| minlength | 原生属性，最小长度 | string | - | - |
| show-password | 显示为密码框 | boolean | - | false |
| disabled | 原生属性，禁用 | boolean | - | false |
| readonly | 原生属性，只读 | boolean | - | false |
| prefixIcon | 前置图标，京麦icon中的图标类名 | string | - | - |
| suffixIcon | 后置图标，京麦icon中的图标类名 | string | - | - |
| show-word-limit | 显示字数限制，需要同时设置 maxlength | boolean | - | false |
| ~~max~~ | ~~原生属性，最大值。~~ 移动端上该属性无效，请使用 InputNumber 组件 | string | - | - |
| ~~min~~ | ~~原生属性，最小值。~~ 移动端上该属性无效，请使用 InputNumber 组件 | string | - | - |
| step | 原生属性，设置输入字段的合法数字间隔 | string | - | - |
| rows | 原生属性，textarea 的行数 | string | - | '3' |
| autosize | 是否高度自适应，可以设置为对象，如 { minRows: 2, maxRows: 6 } | boolean / object | - | - |
| resize | 是否允许用户缩放 | string | 'none', 'both', 'horizontal', 'vertical' | 'none' |
| autofocus | 原生属性，是否自动聚焦，如果在页面加载时让其获得焦点，对于 android 有效， iOS 无效 | boolean | - | false |
| label | 设置左侧标题 | string | - | - |
| size | 设置输入框大小 | string | - | - |
| error | 设置输入框错误状态，错误状态时为红色 | boolean | - | false |
| center | 当有label属性时，设置标题和输入框垂直居中，默认为顶部居中 | boolean | - | false |
| label-width | 设置左侧标题宽度 | string | - | '33%' |
| no-border | 取消底部边框 | boolean | - | false |
| required | cell 类型下必填样式 | boolean | - | false |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| focus        | 监听输入框focus事件                    | -       |
| blur         | 监听输入框blur事件                     | -       |
| change       | 监听输入框修改事件                      | 搜索输入框文本       |
| clear        | 监听输入框清空按钮事件                   | -       |
| click-prefix-icon | 点击前置图标时触发                | - |
| click-suffix-icon | 点击后置图标时触发                | - |

### Methods

| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| focus      | 使输入框获得焦点 | —  |
| blur    | 使输入框失去焦点 | -  |
| select | 使输入框内容被选中 | - |

### Slot

| name      | 说明       |
|------------- |----------- |
| label | 左侧标题插槽 |
| prefix | 前置插槽 |
| suffix | 后置插槽 |