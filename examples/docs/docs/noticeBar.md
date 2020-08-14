## NoticeBar 通知栏

### 按需引入

```javascript
import Vue from 'vue'
import { NoticeBar } from 'wot-design'

Vue.use(NoticeBar)
```

### 基本用法

设置 `text` 文本内容和 `prefix` 左侧图标。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="warn-bold"
></wd-notice-bar>
```

### 类型修改

设置 `type` 可修改通知类型，通知类型共有三种 `info`|`warning`|`danger`，默认值为`warning`。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="warn-bold"
></wd-notice-bar>
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="check-outline"
  type="info"
></wd-notice-bar>
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="wifi-error"
  type="danger"
></wd-notice-bar>
```

### 禁止滚动

设置 `scrollable` 为 `false` 禁止文本滚动。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  :scrollable="false"
></wd-notice-bar>
```

### 插槽演示

```html
<wd-notice-bar>
  <div slot="prefix"><wd-icon name="warn-bold" style="font-size: 18px;padding-right: 4px"></wd-icon></div>
  通知被禁或时段内消息屏蔽可能造成消…
  <div slot="suffix" style="color: #4D80F0">查看</div>
</wd-notice-bar>
```

### 多行展示

设置 `wrapable` 属性为 `true` 且同时禁止滚动 `scrollable` 即可开启多行展示。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  wrapable
  :scrollable="false"
></wd-notice-bar>
```

### 可关闭的

设置 `closable` 属性，使通知栏可以关闭。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  closable
></wd-notice-bar>
```

### 自定义颜色

设置 `color` 修改文字和图标颜色，设置 `background-color` 修改背景颜色。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="check-outline"
  closable
  color="#34D19D"
  background-color="#f0f9eb"
></wd-notice-bar>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| text | 设置通知栏文案 | string | - | - |
| type | 设置通知栏类型 | string | `info`/`warning`/`danger` | 'warning' |
| prefix | 设置左侧图标，使用icon章节中的图标名 | string | - | - |
| scrollable | 是否可以滚动 | boolean | - | true |
| delay | 滚动动画初始延时，单位 秒(s) | number | - | 1 |
| speed | 滚动速度，单位 px/s | number | - | 50 |
| closable | 是否可以关闭 | boolean | - | false |
| wrapable | 是否换行展示 | boolean | - | false |
| color | 文字、图标颜色 | string | - | '-' |
| background-color | 背景颜色 | string | - | '-' |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| click | 关闭按钮点击时 | 点击事件对象Event |

### Slot

| name      | 说明       |
|------------- |----------- |
| default | 通知栏文本 |
| prefix | 前置图标 |
| suffix | 后置插槽 |
