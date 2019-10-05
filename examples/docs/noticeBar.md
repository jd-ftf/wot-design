## NoticeBar 通知栏

### 按需引入

```javascript
import Vue from 'vue'
import { NoticeBar } from 'jm-design'

Vue.use(NoticeBar)
```

### 基本用法

设置 `text` 文本内容和 `left-icon` 左侧图标。

```html
<jm-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  left-icon="bell"
/>
```

### 禁止滚动

设置 `scrollable` 为 `false` 禁止文本滚动。

```html
<jm-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  :scrollable="false"
/>
```

### 多行展示

设置 `wrapable` 属性为 `true` 且同时禁止滚动 `scrollable`。

```html
<jm-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  wrapable
  :scrollable="false"
/>
```

### 可关闭的

设置 `cloable` 属性，使通知栏可以关闭。

```html
<jm-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  closable
/>
```

### 自定义颜色

设置 `color` 修改文字和图标颜色，设置 `background-color` 修改背景颜色。

```html
<jm-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  left-icon="bell"
  closable
  color="#0083ff"
  background-color="#d9ebfd"
/>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| text | 设置通知栏文案 | string | - | - |
| left-icon | 设置左侧图标，使用icon章节中的图标 | string | - | - |
| scrollable | 是否可以滚动 | boolean | - | true |
| delay | 滚动动画初始延时，单位 秒(s) | number | - | 1 |
| speed | 滚动速度，单位 px/s | number | - | 50 |
| closable | 是否可以关闭 | boolean | - | false |
| wrapable | 是否换行展示 | boolean | - | false |
| color | 文字、图标颜色 | string | - | '#ff9000' |
| background-color | 背景颜色 | string | - | '#fef8ef' |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| click | 关闭按钮点击时 | 点击事件对象Event |

### Slot

| name      | 说明       |
|------------- |----------- |
| default | 通知栏文本 |
| left-icon | 左侧图标 |
| right-icon | 右侧图标 |
