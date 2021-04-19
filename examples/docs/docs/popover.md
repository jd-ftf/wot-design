## Popover 气泡

常用于展示提示信息。

### 按需引入

```javascript
import Vue from 'vue'
import { popover } from 'wot-design'

Vue.use(popover)
```

### 基本用法

Popover 的属性与 [Tooltip](/docs#/components/tooltip) 很类似，因此对于重复属性，请参考 [Tooltip](/docs#/components/tooltip) 的文档，在此文档中不做详尽解释。

```html
<div>
  <wd-popover content="这是一段内容,这是一段内容,这是一段内容,这是一段内容">
    <wd-button >点击激活</wd-button>
  </wd-popover>
</div>
```

### 模式 mode

使用 `mode` 属性控制当前文字提示的展示模式。`mode` 可选参数为 `normal` / `menu`：

- **normal**（普通文字模式）:
  - 当 `mode` 处于默认状态，`content` 属性传入要显示的 `String` 字符串。

- **menu**（列表模式）:
  - 文字提示框会展示成列表形式，此时 `content` 属性传入 `Array` 类型，数组内对象数据结构如下方列表所示。
  - 绑定事件 `menu-click`，在选择结束后，执行操作，列表关闭。

列表模式下 `content` 数组内对象的数据结构：

| 键名 | 说明 | 类型 | 是否必填 | 最低版本 |
|-----|------|-----|---------|--------|
| content | 选项名 | string | 是 | - |
| iconClass（不设置该属性时只展示标题） | 选项值 | string | 否 | - |

**注意：class属性值为组件库内部的icon类名。也可自定义类名，自定义类名需要用户自行传入图标类库。**

```html
<template>
  <wd-popover mode="menu" :content="menu" @menu-click="linkTo">
    <wd-button class="btn btn-default">列表</wd-button>
  </wd-popover>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          iconClass: 'wd-icon-read',
          content: '全部标记已读'
        },
        {
          iconClass: 'wd-icon-delete',
          content: '清空最近会话'
        }
      ]
    }
  },
  methods: {
    linkTo (item, index) {
      this.$toast.success('操作成功: ' + (index + 1) + '.' + item.content)
    }
  }
}
</script>
```

### 嵌套信息

使用插槽 `content` 可以在 Popover 中嵌套多种类型信息。

```html
<template>
  <wd-popover>
    <div slot="content">
      <i class="pop-content">这是一段自定义样式的内容。</i>
    </div>
    <wd-button class="btn btn-default">点击展示</wd-button>
  </wd-popover>
</template>

<style scoped>
.pop-content{
  color: #8268de;
  font-weight: bolder;
}
</style>
```

## 注意

如果想用 `外部开关按钮` 控制 popover 弹框的显隐，需要阻止 `事件冒泡`，在控制开关的函数内部添加阻止冒泡事件，详细请看[Tooltip](/docs#/components/tooltip)。

### Popover Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| value / v-model |  手动状态是否可见  | boolean | - | false | - |
| content | 显示的内容，也可以通过 `slot#content` 传入 | string / array（当模式为菜单模式时，content属性格式为Array） | - | - | - |
| mode | 当前显示的模式，决定内容的展现形式 | string | 'normal'（普通模式）/'menu'（菜单模式） | normal | - |
| placement | popover 的出现位置 | string | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | bottom | - |
| visible-arrow | 是否显示 popover 箭头 | boolean | - | true | - |
| disabled | popover 是否可用 | boolean | - |  false | - |
| offset | 出现位置的偏移量 | number | - | 0 | - |
| close-outside | 是否可以通过点击其他位置 关闭 popover | boolean | - | true | - |

### Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| content | 多行内容或用户自定义样式 | - |

### Events

| 事件名称 | 说明 | 回调参数 | 最低版本 |
| -------|------|---------|--------|
| show |显示时触发 | - | - |
| hide | 隐藏时触发 | - | - |
| menu-click | menu 模式下点击某一选项触发 | item: 选中项, index: 当前选项索引index | - |
