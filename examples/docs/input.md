## Input 输入框

### 按需引入

```javascript
import Vue from 'vue'
import { Input } from 'jm-design'

Vue.use(Input)
```

### 基本用法

`v-model` 为绑定值。

```html
<jm-input v-model="input" placeholder="请输入用户名" />

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>
```

### 禁用

设置 `disabled` 属性。

```html
<jm-input v-model="input" disabled />
```

### 只读

设置 `readonly` 属性。

```html
<jm-input v-model="input" readonly />
```

### 清空按钮

设置 `clearable` 属性。

```html
<jm-input v-model="input" clearable />
```

### 密码输入框

设置 `show-password` 属性。

```html
<jm-input v-model="input" clearable show-password />
```

### 前后icon

设置前置icon `prefix-icon`，设置后置icon `suffix-icon`。

```html
<jm-input v-model="input" prefix-icon="jm-icon-person" suffix-icon="jm-icon-tickets" />
```

### 限制字数输入

设置 `maxlength` 属性，如果要显示字数限制，设置 `show-word-limit` 属性。

```html
<jm-input v-model="input" maxlength="20" show-word-limit />
```

### 文本域

设置 `type` 为 'textarea`。

```html
<jm-input type="textarea" v-model="input" placeholder="请填写评价..." />
```

设置清空，字数限制，设置 `rows` 行数。也可以设置 `autosize` ，使文本域高度自动增加。

```html
<jm-input type="textarea" v-model="input" :rows="6" maxlength="120" clearable show-word-limit />
```

### 普通输入框高度自增加

```html
<jm-input v-model="input" autosize clearable />
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
| showPassword | 显示为密码框 | boolean | - | false |
| disabled | 原生属性，禁用 | boolean | - | false |
| readonly | 原生属性，只读 | boolean | - | false |
| prefixIcon | 前置图标，京麦icon中的图标类名 | string | - | - |
| suffixIcon | 后置图标，京麦icon中的图标类名 | string | - | - |
| showWordLimit | 显示字数限制，需要同时设置 maxlength | boolean | - | false |
| max | 原生属性，最大值 | string | - | - |
| min | 原生属性，最小值 | string | - | - |
| step | 原生属性，设置输入字段的合法数字间隔 | string | - | - |
| rows | 原生属性，textarea 的行数 | string | - | '3' |
| autosize | 是否高度自适应，可以设置为对象，如 { minRows: 2, maxRows: 6 } | boolean / object | - | - |
| resize | 是否允许用户缩放 | string | 'none', 'both', 'horizontal', 'vertical' | 'none' |
| autofocus | 原生属性，是否自动聚焦，如果在页面加载时让其获得焦点，对于 android 有效， iOS 无效 | boolean | - | false |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| focus        | 监听输入框focus事件                    | -       |
| blur         | 监听输入框blur事件                     | -       |
| change       | 监听输入框修改事件                      | 搜索输入框文本       |
| clear        | 监听输入框清空按钮事件                   | -       |

### Methods

| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| focus      | 使输入框获得焦点 | —  |
| blur    | 使输入框失去焦点 | -  |
| select | 使输入框内容被选中 | - |