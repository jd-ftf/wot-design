## Tooltip 文字提示
常用于展示提示信息。
### 按需引入

```javascript
import Vue from 'vue'
import { Tooltip } from 'wot-design'

Vue.use(Tooltip)
```

### 基本用法

在这里我们提供 12 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

使用`content`属性来决定显示时的提示信息。

由`placement`属性决定展示效果：`placement`属性值为：`方向-对齐位置`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。如`placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。
```html
<div>
  <wd-tooltip placement="top" content="top 提示文字">
   <wd-button class="btn btn-default">top</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="top-start" content="top-start 提示文字">
    <wd-button class="btn btn-default">top-start</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="top-end" content="top-end 提示文字">
    <wd-button class="btn btn-default">top-end</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="bottom" content="bottom 提示文字">
    <wd-button class="btn btn-default">bottom</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="bottom-start" content="bottom-start 提示文字">
    <wd-button class="btn btn-default">bottom-start</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="bottom-end" content="bottom-end 提示文字">
    <wd-button class="btn btn-default">bottom-end</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="left" content="left 提示文字">
    <wd-button class="btn btn-default">left</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="left-start" content="left-start 提示文字">
    <wd-button class="btn btn-default">left-start</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="left-end" content="left-end 提示文字">
    <wd-button class="btn btn-default">left-end</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="right" content="right 提示文字">
    <wd-button class="btn btn-default">right</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="right-start" content="right-start 提示文字">
    <wd-button class="btn btn-default">right-start</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="right-end" content="right-end 提示文字">
    <wd-button class="btn btn-default">right-end</wd-button>
  </wd-tooltip>
</div>
```
### 主题

Tooltip 组件提供了两个不同的主题：`dark`和`light`。

通过设置`effect`属性来改变主题，默认为`dark`。
```html
<wd-tooltip content="dark 默认主题">
  <wd-button >dark</wd-button>
</wd-tooltip>
<wd-tooltip effect="light" content="light 主题">
  <wd-button >light</wd-button>
</wd-tooltip>
```

### 更多 Content

展示多行文本或者是设置文本内容的格式

用具名 slot 分发`content`，替代 `tooltip` 中的 `content` 属性。
```html
<wd-tooltip placement="right">
  <div slot="content" style="color: red; padding: 5px; width: 90px">
    <div>多行文本1</div>
    <div>多行文本2</div>
  </div>
  <wd-button class="btn btn-default">多行文本</wd-button>
</wd-tooltip>
```

### 模式 mode

使用 `mode` 属性控制当前文字提示的模式。

`mode` 有两个值，一种是 `normal` 普通文字模式，另一种是 `menu` 列表模式:

* **normal**: 当 `mode` 处于默认状态，`content` 属性传入要显示的 `String` 字符串。

* **menu**: 文字提示框会展示成列表形式，此时 `content` 属性传入 `Array` 类型，数组中每一个对象以 `[{ name: 'person', content: '内容' }]` 命名。如果不需要icon，那么传入 `[{ content: '内容' }]`。
```html
<template>
  <wd-tooltip mode="menu" :content="menu">
    <wd-button class="btn btn-default">列表</wd-button>
  </wd-tooltip>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          name: 'person',
          content: '全部标记已读'
        },
        {
          name: 'close-fill',
          content: '清空最近会话'
        }
      ]
    }
  },
}
</script>
```
### 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

`transition` 属性可以定制显隐的动画效果，默认为`wd-fade`。

如果需要关闭 `tooltip` 功能，`disabled` 属性可以满足这个需求，它接受一个`Boolean`，设置为`true`即可。
```html
<template>
  <wd-tooltip :disabled="disabled" content="点击关闭 tooltip 功能" placement="right" effect="light">
    <wd-button @click="disabled = !disabled">点击{{disabled ? '开启' : '关闭'}} tooltip 功能</wd-button>
  </wd-tooltip>
</template>
<script>
  export default {
    data () {
      return {
        disabled: false
      }
    }
  }
</script>
```
### Tooltip Attributes

| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  effect        |  默认提供的主题  | String            | dark/light | dark  |
|  content        |  显示的内容，也可以通过 `slot#content` 传入  | String/Array            | — | — |
|  placement        |  Tooltip 的出现位置  | String           |  top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  visible-arrow   |  是否显示 Tooltip 箭头 | Boolean | — | true |
| open-delay | 延迟出现，单位毫秒 | Number | — | 0 |
|  disabled       |  Tooltip 是否可用  | Boolean           | — |  false |
|  offset        |  出现位置的偏移量  | Number           | — |  5 |

### Slot

| name      | 说明       |
|------------- |----------- |
| content | 多行内容或用户自定义样式 |

### Events
| 事件名称           | 说明             | 回调参数                                     |
| -------------- | -------------- | ---------------------------------------- |
| show     |显示时触发       | - |
| hide | 隐藏时触发 | - |