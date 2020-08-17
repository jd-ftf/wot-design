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

### 显示关闭按钮

Tooltip 组件通过属性`show-close` 控制是否显示关闭按钮。

```html
<wd-tooltip content="显示关闭按钮" show-close>
  <wd-button >显示关闭按钮</wd-button>
</wd-tooltip>
```

### 更多 Content

展示多行文本或者是设置文本内容的格式

用具名 slot 分发`content`，替代 `tooltip` 中的 `content` 属性。

```html
<wd-tooltip placement="right">
  <div slot="content" style="padding: 5px; width: 90px">
    <div>多行文本1</div>
    <div>多行文本2</div>
    <div>多行文本3</div>
  </div>
  <wd-button class="btn btn-default">多行文本</wd-button>
</wd-tooltip>
```

### 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

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

## 注意

组件默认点击外部关闭，因此如果想用 `外部开关按钮` 控制 tooltip 弹框的显隐，需要阻止 `事件冒泡`，防止点击外部关闭造成的干扰，在控制开关的函数内部添加阻止冒泡事件。

```html
<template>
  <wd-tooltip v-model="show" placement="top">
    <wd-button class="btn btn-default">控制显隐</wd-button>
  </wd-tooltip>
</template>
<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      control () {
        this.show = !this.show
        // 阻止事件冒泡
        event.stopPropagation()
      }
    }
  }
</script>
```

### Tooltip Attributes

| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  value / v-model |  手动状态是否可见  | Boolean           | — |  false |
|  content        |  显示的内容，也可以通过 `slot#content` 传入  | String            | — | — |
|  placement        |  Tooltip 的出现位置  | String           |  top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  visible-arrow   |  是否显示 Tooltip 箭头 | Boolean | — | true |
|  show-close   |  是否显示 Tooltip 内部的关闭按钮 | Boolean | — | false |
|  disabled       |  Tooltip 是否可用  | Boolean           | — |  false |
|  offset        |  出现位置的偏移量  | Number           | — |  5 |
| close-outside | 是否可以通过点击其他位置 关闭 tooltip | boolean    | — | true |

### Slot

| name      | 说明       |
|------------- |----------- |
| content | 多行内容或用户自定义样式 |

### Events

| 事件名称           | 说明             | 回调参数                                     |
| -------------- | -------------- | ---------------------------------------- |
| show     |显示时触发       | - |
| hide | 隐藏时触发 | - |
