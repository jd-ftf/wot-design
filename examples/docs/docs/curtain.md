## Curtain 幕帘

### 按需引入

```javascript
import Vue from 'vue'
import { Curtain } from 'wot-design'

Vue.use(Curtain)
```

### 基本用法

`v-model` 为绑定值，表示是否展示幕帘，值为`boolean` 类型，必填项。

`src` 为幕帘图片地址（只支持在线地址），值为 `string` 类型，必填项。

`to` 为幕帘点击访问链接，值为 `string` 类型，非必填项。

```html
<wd-button @click="show = true">展示幕帘</wd-button>
<wd-curtain v-model="show" src="https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png" to="//jd.com"></wd-curtain>
```

### 设置幕帘图片宽度

设置 `width`，默认为图片宽度， 高度会随宽度自动撑开，非必填项。

```html
<wd-button @click="show = true">展示幕帘</wd-button>
<wd-curtain v-model="show" src="https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png" to="//jd.com" width="280px"></wd-curtain>
```

### 修改关闭按钮位置

设置 `close-position`，默认为 'inset'，可选值 'top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'。

```html
<wd-button @click="show = true">展示幕帘</wd-button>
<wd-curtain v-model="show" close-position="bottom" src="https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png" to="//jd.com" width="200px"></wd-curtain>
```

### 设置遮罩点击可关闭幕帘

设置 `close-on-click-modal` 属性，值为`boolean` 类型，非必填项。

```html
<wd-button @click="show = true">展示幕帘</wd-button>
<wd-curtain v-model="show" src="https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png" to="//jd.com" close-on-click-modal></wd-curtain>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值，展示/关闭幕帘 | boolean | - | - |
| src | 幕帘图片地址 | string | 在线地址 | - |
| to | 幕帘图片点击链接 | string | - | - |
| width | 幕帘图片宽度 | string | - | - |
| close-position | 关闭按钮位置 | string | 'inset', 'top', 'bottom', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right' | 'inset' |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | false |
| teleport | 指定挂载的 HTML 节点, 可以为字符串，也可以为对象，为对象时有 `to` 和 `disabled` 属性，`to` 表示挂载点，`disabled` 表示挂载到当前节点上 | string / object  | - | 'body' |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| click | 点击幕帘时触发 | - |
| open | 幕帘打开时触发 | - |
| opened | 幕帘打开动画结束时触发 | - |
| close | 幕帘关闭时触发 | - |
| closed | 幕帘关闭动画结束时触发 | - |
| click-modal | 点击遮罩时触发 | - |
