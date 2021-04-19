## Popup 弹出层

### 按需引入

```javascript
import Vue from 'vue'
import { Popup } from 'wot-design'

Vue.use(Popup)
```

### 基本用法

`v-model` 为绑定值，表示是否展示弹出层。

```html
<wd-button plain @click="show = true">弹出层</wd-button>
<wd-popup v-model="show" :style="{ 'padding': '30px 40px' }">内容</wd-popup>
```

### 弹出位置

设置 `position`，默认为 'center'，可选值 'top', 'right', 'bottom', 'left'。

```html
<wd-popup v-model="show" position="top" :style="{ 'height': '200px' }"></wd-popup>
```

### 关闭按钮

设置 `closable` 属性。

```html
<wd-popup v-model="show" position="bottom" :style="{ 'height': '200px' }" closable></wd-popup>
```

### 设置挂载点

使用 `teleport` 属性设置挂载点，默认为 'body'，用 CSS 选择器的写法。 `teleport` 可以为对象，有 `to` 和 `disabled` 属性，`to` 表示挂载点，`disabled` 表示挂载到当前节点上。

```html
<wd-popup v-model="show" teleport="#app" :style="{ 'padding': '30px 40px' }">内容</wd-popup>
```

挂载到当前节点上。

```html
<wd-popup v-model="show" :teleport="{ disabled: true }" :style="{ 'padding': '30px 40px' }">内容</wd-popup>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|-----|
| value/v-model | 绑定值，展示/关闭弹出层 | boolean | - | - | - |
| position | 弹出位置 | string | center / top / right / bottom / left | center | - |
| closable | 关闭按钮 | boolean | - | false | - |
| lock-scroll | 锁定背景滚动 | boolean | - | true | - |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | - |
| close-on-popstate | 页面返回时自动关闭 | boolean | - | true | 2.3.0 |
| duration | 动画持续时间 | number | - | 300(ms) | - |
| teleport | 指定挂载的 HTML 节点, 可以为字符串，也可以为对象，为对象时有 `to` 和 `disabled` 属性，`to` 表示挂载点，`disabled` 表示挂载到当前节点上 | string / object  | - | body | - |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型），见 [底部安全区域适配](#/components/commonProblems#di-bu-an-quan-qu-yu-gua-pei-iphone-x-lei-xing-de-ji-xing) | boolean | - | false | 2.3.0 |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|------|
| open | 弹出层打开时触发 | - | - |
| opened | 弹出层打开动画结束时触发 | - | - |
| close | 弹出层关闭时触发 | - | - |
| closed | 弹出层关闭动画结束时触发 | - | - |
| click-modal | 点击遮罩时触发 | - | - |
