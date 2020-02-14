# DropMenu 下拉菜单

### 按需引入

```javascript
import Vue from 'vue'
import { DropMenu, DropMenuItem } from 'wot-design'

Vue.use(DropMenu)
Vue.use(DropMenuItem)
```

## 代码演示

### 基础用法

基础用法需要绑定 `value` 值以及 `options` 属性。

 `options` 属性一般格式为 `[{ text:'', value: '0' }]`, 如果开启内容插槽,应当使用 `string` 类型, 使用说明见后文。

```html
<wd-drop-menu-menu>
  <wd-drop-menu-item value="0" :options="option1" />
  <wd-drop-menu-item value="a" :options="option2" />
</wd-drop-menu-menu>
```

### 外部控制选项

`value` 值可以绑定静态数据, 也可以绑定变量，通过控制绑定的 `value` 或 `v-model` 设置绑定值去控制其显示。

```html
<wd-drop-menu-menu>
  <wd-drop-menu-item v-model="value1" :options="option1"/>
  <wd-drop-menu-item v-model="value2" :options="option2"/>
</wd-drop-menu-menu>
```

```JavaScript
export default {
  data() {
    return {
      value1: '2',
      value2: '1',
      option1: [
        { text: '全部商品', value: '0' },
        { text: '新款商品', value: '1' },
        { text: '活动商品', value: '2' }
      ],
      option2: [
        { text: '综合', value: '0' },
        { text: '销量', value: '1' },
        { text: '上架时间', value: '2' }
      ]
    }
  }
}
```

### 自定义菜单内容

通过插槽`custom`可以自定义 `DropMenuItem` 的内容，此时需要使用实例上的 `close` 方法手动控制菜单的关闭。

使用 `custom` 插槽过程中, 传入 `string` 类型的 `options` 属性用来展示列表上的显示名称。

```html
<wd-drop-menu>
  <wd-drop-menu-item value="0" :options="option1" />
  <wd-drop-menu-item options="筛选" ref="dropMenu">
    <div slot="custom">
      <wd-cell title="标题文字" value="内容" />
      <wd-cell title="标题文字" label="描述信息" value="内容" />
      <wd-button type="primary" block size="large" suck @click="confirm">主要按钮</wd-button>
    </div>
  </wd-drop-menu-item>
</wd-drop-menu>
```

```JavaScript
export default {
  data() {
    return {
      option1: [
        { text: '全部商品', value: '0' },
        { text: '新款商品', value: '1' },
        { text: '活动商品', value: '2' }
      ]
    }
  },
  methods: {
    confirm () {
      this.$refs.dropMenu.close()
    }
  }
}
```

### 自定义菜单选项

通过插槽 `menu` 可以自定义 `DropMenu` 某一选项的内容。。

注意: 使用 `dropMenu` 插槽的过程中，菜单内容和展开方式也需要用户自行控制。如果只需要控制选项卡上的选项(如: `sortButton`), 则不需要展开折叠。

```html
<wd-drop-menu>
  <wd-drop-menu-item value="0" :options="option1" />
  <div slot="menu" style="line-height: 14px;">
    <wd-sort-button v-model="value3"  title="价格"/>
  </div>
</wd-drop-menu>
```

### 自定义选中态颜色

通过`active-color`属性可以自定义菜单标题和选项的选中态颜色

```html
<wd-drop-menu-menu active-color="#ee0a24">
  <wd-drop-menu-item value="0" :options="option1" />
  <wd-drop-menu-item value="1" :options="option2" />
</wd-drop-menu-menu>
```

### 向上展开

将`direction`属性值设置为`up`，菜单即可向上展开

```html
<wd-drop-menu-menu direction="up">
  <wd-drop-menu-item value="0" :options="option1" />
  <wd-drop-menu-item value="1" :options="option2" />
</wd-drop-menu-menu>
```

### 禁用菜单

```html
<wd-drop-menu>
  <wd-drop-menu-item value="0" disabled :options="option2" />
  <wd-drop-menu-item value="0" disabled :options="option1" />
</wd-drop-menu>
```

### DropMenu Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| active-color | 菜单标题和选项的选中态颜色 | string | - | '#0083ff'|
| direction | 菜单展开方向，可选值为`up` 或 `down` | string | - | 'down' |
| close-outside | 是否开启点击外部关闭 | boolean | - | true |

### DropMenuItem Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value / v-model | 当前选中项对应选中的 value | string | - | - |
| disabled | 禁用菜单 | boolean | - | false |
| options | 选项`options`类型为`Array`时: 展示列表, 对应数据结构 `[{text: '标题', value: '0'}]`; 类型为`string`: 使用自定义菜单内容; | Array / String | - | - | - |
| modal | 是否显示遮罩层 | boolean | - | false |
| icon-name | 选中的图标名称(可选名称在wd-icon组件中) | string | - | 'check-round' |
| close-on-click-modal | 是否在点击遮罩层后关闭菜单 | boolean | - | true |

### DropdownItem Events

通过 `this.$refs.dropMenu` 可以获取到 DropdownItem 实例并调用实例方法

| 方法名 | 说明 | 参数 | 返回值 |
|------|------|------|------|
| close | 关闭菜单 | - | - |
| open | 展开菜单 | - | - |

### DropMenu Slot

| name      | 说明       |
|------------- |----------- |
| default | 菜单内容 |
| custom | 菜单内容插槽 |

### DropMenuItem Slot

| name      | 说明       |
|------------- |----------- |
| menu | 菜单选项卡中的一个自定义选项插槽 |
