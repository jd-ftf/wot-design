## Popup 弹出层

### 按需引入

```javascript
import Vue from 'vue'
import { Popup } from 'jm-design'

Vue.use(Popup)
```

### 基本用法

`v-model` 为绑定值，表示是否展示弹出层。

```html
<jm-button type="primary" plain @click="show = true">弹出层</jm-button>
<jm-popup v-model="show" :style="{ 'padding': '30px 40px' }">内容</jm-popup>
```

### 弹出位置

设置 `position`，默认为 'center'，可选值 'top', 'right', 'bottom', 'left'。

```html
<jm-popup v-model="show" position="top" :style="{ 'height': '200px' }"></jm-popup>
```

### 关闭按钮

设置 `closable` 属性。

```html
<jm-popup v-model="show" position="bottom" :style="{ 'height': '200px' }" closable></jm-popup>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值，展示/关闭弹出层 | boolean | - | - |
| position | 弹出位置 | string | 'center', 'top', 'right', 'bottom', 'left' | 'center' |
| closable | 关闭按钮 | boolean | - | false |
| lock-scroll | 锁定背景滚动 | boolean | - | true |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | 
| duration | 动画持续时间 | number | - | 300(ms) |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| open | 弹出层打开时触发 | - |
| opened | 弹出层打开动画结束时触发 | - |
| close | 弹出层关闭时触发 | - |
| closed | 弹出层关闭动画结束时触发 | - |
| click-modal | 点击遮罩时触发 | - |
