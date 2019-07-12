## Cell单元格

### 按需引入

```javascript
import Vue from 'vue'
import { CellGroup, Cell } from 'jm-design'

Vue.use(CellGroup)
Vue.use(Cell)
```

### 基本用法

`Cell` 可以单独使用，也可以和 `CellGroup` 组合使用。

```html
<jm-cell title="标题文字" value="内容" />

<jm-cell-group>
  <jm-cell title="标题文字" value="内容" />
  <jm-cell title="标题文字" label="描述信息" value="内容" />
</jm-cell-group>
```

### 图标设置

设置 `icon` 属性，可以为 Icon 章节中的图标，也可以通过 icon 的 slot 自定义图标位置。

> 自定义图标，如果有多个cell，需保证所有图标的宽度是一致的且垂直居中。如果使用 icon 属性且为 Icon 章节的字体图标，则宽度一致且垂直居中。

```html
<jm-cell-group>
  <jm-cell title="标题文字" value="内容" icon="jm-icon-setting" />
  <jm-cell title="标题文字" value="内容" icon="jm-icon-collect" />
  <jm-cell title="标题文字" value="内容">
    <div class="custom-icon" slot="icon">
      <i class="cell-icon"></i>
    </div>
  </jm-cell>
</jm-cell-group>

<style>
.custom-icon {
  position: relative;
  width: 18px;
  height: 100%;
}
.cell-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url('https://img10.360buyimg.com/jmadvertisement/jfs/t1/71075/7/3762/1820/5d1f26d1E0d600b9e/a264c901943080ac.png') no-repeat;
  background-size: cover;
}
</style>
```

### 分组标题

可以在 `cell-group` 上设置 `title` 和 `value` 属性。也可以使用 slot 插槽。

```html
 <jm-cell-group title="交易管理" value="订购">
  <div slot="value" class="custom-group-value">
    <i class="jm-icon-cart"></i>
    <span>订购</span>
  </div>
  <jm-cell title="标题文字" value="内容" />
  <jm-cell title="标题文字" label="描述信息" value="内容" />
</jm-cell-group>
```

### 页面跳转

通过设置 `is-link` 属性显示导航箭头和点击态，设置 `to` 属性，指定跳转地址。`to` 属性可以为 `vue-router` 中的路由对象，也可以是普通链接。

```html
<jm-cell title="帮助与反馈" is-link to="https://jmw.jd.com/lib/jm-design/examples.html" />
<jm-cell title="设置" value="内容" is-link :to="{ path: '/button' }" />
```

### 自定义内容

`cell` 提供了 `icon`、`title`、`label`和默认value的插槽。

```html
<jm-cell-group>
  <jm-cell title="标题文字">
    <jm-button class="custom-value" size="small" type="primary" plain>按钮</jm-button>
  </jm-cell>
  <jm-cell title="标题文字">
    <jm-switch class="custom-value" v-model="value" />
  </jm-cell>
  <jm-cell>
    <div slot="title">
      <span>标题文字</span>
      <span class="end-time">25天后到期</span>
    </div>
  </jm-cell>
</jm-cell-group>

<style>
.custom-value {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  white-space: nowrap;
}
</style>
```

> 自定义内容如果超出了默认的46px高度，可能需要你自己通过绝对定位使其保持样式一致。

### CellGroup Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| title | 分组标题 | string | - | - |
| value | 分组右侧内容 | string | - | - |

### Cell Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| title | 标题 | string | - | - |
| value | 右侧内容 | string | - | - |
| icon | 图标类名 | string | - | - |
| label | 描述信息 | string | - | - |
| is-link | 是否为跳转链接 | boolean | - | false |
| to | 跳转地址 | string / object | - | - |

### CellGroup Slot
| name      | 说明       |
|------------- |----------- |
| title | 分组标题 |
| value | 分组右侧内容 |

### Cell Slot
| name      | 说明       |
|------------- |----------- |
| title | 标题 |
| default | 右侧内容 |
| icon | 图标 |
| label | 描述信息 |
