# Grid 宫格

### 按需引入

```javascript
import Vue from 'vue'
import { Grid, GridItem } from 'wot-design'

Vue.use(Grid)
Vue.use(GridItem)
```

## 代码演示

### 基础用法

基础用法需要绑定 `icon` 值以及 `text` 属性。默认显示一行。

`icon` 为 `wd-icon` 标签中的 `name` 属性。

```html
<wd-grid>
  <wd-grid-item icon="picture" text="文字" v-for="i in 4" :key="i"/>
</wd-grid>
```

### 自定义列数

`column` 可以用来自定义宫格列数。未定义 `column` 属性时，默认显示为一行，定义该属性后，组件内部根据 `column` 属性自行划分行数。

```html
<wd-grid :column="4">
  <wd-grid-item icon="picture" text="文字" v-for="i in 8" :key="i"/>
</wd-grid>
```

### 内容插槽

通过默认插槽可以自定义 `GridItem` 的内容。

```html
<wd-grid>
  <wd-grid-item v-for="i in 8" :key="i">
    <img class="img" src="../images/jd.png" />
  </wd-grid-item>
</wd-grid>
```

```css
.img{
  width: 100%;
  height: 90px;
}
```

### 单个插槽

通过插槽 `icon` 可以插入 `GridItem` 中的图标位。

通过插槽 `text` 可以插入 `GridItem` 中的文字位。

注意: 外部控制每一个  `GridItem` 的高度时，保证每一个 `GridItem` 的高度相同且符合用户预期。

```html
<wd-grid :column="3">
  <wd-grid-item text="文字" v-for="i in 3" :key="i">
    <img slot="icon" class="slot-img" src="../images/jd.png" />
  </wd-grid-item>
</wd-grid>
<wd-grid :column="3">
  <wd-grid-item icon="picture" v-for="i in 3" :key="i">
    <div slot="text" class="text">
      这是一段测试数字
    </div>
  </wd-grid-item>
</wd-grid>
```

```css
.slot-img{
  height: 50px;
  width: 50px;
  margin-bottom: 5px;
}
.text{
  color: #ffb300;
  margin-top: 5px;
}
```

### 正方形格子

通过 `square` 属性开启正方形格属性。此时显示每一个 `GridItem` 都为正方形。

注意: 使用 `square` 不要自定义 `GridItem` 的高度样式。

```html
<wd-grid square :column="4">
  <wd-grid-item icon="picture" text="文字" v-for="i in 8" :key="i"/>
</wd-grid>
```

### 设定格间隙

通过 `gutter` 属性设置格子之间的距离。

```html
<wd-grid :gutter="10" :column="4">
  <wd-grid-item icon="picture" text="文字" v-for="i in 8" :key="i"/>
</wd-grid>
```

### 页面导航

通过 `clickable` 属性开启可点击状态, 可以绑定 `click` 事件。

设置 `to` 属性，指定跳转地址。`to` 属性可以为 `vue-router` 中的路由对象，也可以是普通链接。

```html
<template>
  <wd-grid>
    <wd-grid-item :to="href" @item-click="click" icon="person" text="location to ..." />
    <wd-grid-item :to="{ path: '/button' }" @item-click="click" icon="link" text="RouterLink to ..." />
  </wd-grid>
</template>

<script>
export default {
  data () {
    return {
      href: location.href.split('#')[0]
    }
  }
}
</script>
```

### 提示信息

设置 `is-dot` 属性后，会在图标右上角展示一个小红点。

设置 `type` | `max` | `value` , 使用方式同组件 `wd-badge` 中的同名属性。

```html
<wd-grid>
  <wd-grid-item is-dot icon="cart" text="文字" />
  <wd-grid-item :value="100" :max="99" icon="chat-bubble" text="文字" />
</wd-grid>
```

### Grid Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| column | 列数 | number | - | - |
| border | 是否显示边框 | boolean | - | true |
| gutter | 格子之间的间距，默认单位为`px` | number | - | 0 |
| square | 是否将格子固定为正方形 | boolean | - | false |
| clickable | 是否开启格子点击反馈 | boolean | - | false |

### GridItem Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| text | 文字 value | string | - | - |
| icon-size | 图标大小，默认单位为`px` | string | - | '26px' |
| icon | 图标名称，可选值见 `wd-icon` 组件 | string | - | - |
| is-dot | 是否显示图标右上角小红点 | boolean / false | - | - | - |
| type | 图标右上角显示的 `badge` 类型 | string | primary / success / warning / danger / info | - |
| value | 图标右上角 `badge` 显示值 | string, number | - | - |
| max | 图标右上角 `badge` 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | number | - | - |
| to | 跳转地址 | string / object | - | - |
| replace | 跳转时是否替换栈顶页面，只对 `vue-router` 中的路由对象有效，普通链接无效 | boolean | - | false |

### GridItem Events

| 方法名 | 说明 | 参数 | 返回值 |
|------|------|------|------|
| item-click | 点击(跳转)事件 | event | - |

### Grid Slot

| name      | 说明       |
|------------- |----------- |
| default | 宫格内容 |

### GridItem Slot

| name      | 说明       |
|------------- |----------- |
| default | 宫格中每一格的默认显示全部内容 |
| icon | 宫格中图标位内容 |
| text | 宫格中文本位内容 |
