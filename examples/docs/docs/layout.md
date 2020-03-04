# Layout 布局

`Layout` 组件由 `wd-col` 组件和 `wd-row` 组成。

### 按需引入

```javascript
import Vue from 'vue'
import { Row, Col } from 'wot-design'

Vue.use(Row)
Vue.use(Col)
```

## 代码演示

### 基本用法

`Layout` 组件提供了 `24列` 栅格，通过在 `wd-col` 上设置 `span` 属性，通过计算当前内容所占百分比进行分栏。

```html
<wd-row>
  <wd-col span="24" class="dark">span: 24</wd-col>
</wd-row>
<wd-row>
  <wd-col span="12" class="dark">span: 12</wd-col>
  <wd-col span="12" class="light">span: 12</wd-col>
</wd-row>
<wd-row>
  <wd-col span="8" class="dark">span: 8</wd-col>
  <wd-col span="8" class="light">span: 8</wd-col>
  <wd-col span="8" class="dark">span: 8</wd-col>
</wd-row>
<wd-row>
  <wd-col span="6" class="dark">span: 6</wd-col>
  <wd-col span="6" class="light">span: 6</wd-col>
  <wd-col span="6" class="dark">span: 6</wd-col>
  <wd-col span="6" class="light">span: 6</wd-col>
</wd-row>
```

```css
.dark,
.light {
  color: #fff;
  font-size: 12px;
  line-height: 34px;
  height: 34px;
  text-align: center;
  margin-bottom: 10px;
  background-clip: content-box;
}

.dark {
  background-color: #39a9ed;
}

.light {
  background-color: #66c6f2;
}

```

### 分栏偏移

`offset` 属性可以设置分栏的偏移量，计算方式以及偏移大小与 `span` 相同。

```html
<wd-row>
  <wd-col span="4" class="dark">span: 4</wd-col>
  <wd-col span="8" offset="4" class="light">span: 8 offset: 4</wd-col>
</wd-row>
<wd-row>
  <wd-col span="8" offset="4" class="dark">span: 8 offset: 4</wd-col>
  <wd-col span="8" offset="4" class="light">span: 8 offset: 4</wd-col>
</wd-row>
```

### 分栏间隔

通过 `gutter` 属性可以设置列元素之间的间距，默认间距为 0

```html
<wd-row gutter="20">
  <wd-col span="8" class="dark">span: 8</wd-col>
  <wd-col span="8" class="light">span: 8</wd-col>
  <wd-col span="8" class="dark">span: 8</wd-col>
</wd-row>
```

### Flex 布局

将 `flex` 属性设置为 true, 开启 `flex布局`。

`flex` 模式下，可以设置 `justify` 以及 `align` 属性。

```html
<!-- 左对齐 -->
<wd-row flex>
  <wd-col span="6">span: 6</wd-col>
  <wd-col span="6">span: 6</wd-col>
  <wd-col span="6">span: 6</wd-col>
</wd-row>

<!-- 居中 -->
<wd-row flex justify="center">
  <wd-col span="6">span: 6</wd-col>
  <wd-col span="6">span: 6</wd-col>
  <wd-col span="6">span: 6</wd-col>
</wd-row>

<!-- 右对齐 -->
<wd-row flex justify="end">
  <wd-col span="6">span: 6</wd-col>
  <wd-col span="6">span: 6</wd-col>
  <wd-col span="6">span: 6</wd-col>
</wd-row>

<!-- 两端对齐 -->
<wd-row flex justify="space-between">
  <wd-col span="6">span: 6</wd-col>
  <wd-col span="6">span: 6</wd-col>
  <wd-col span="6">span: 6</wd-col>
</wd-row>

<!-- 平均间隔 -->
<wd-row flex justify="space-around">
  <wd-col span="6">span: 6</wd-col>
  <wd-col span="6">span: 6</wd-col>
  <wd-col span="6">span: 6</wd-col>
</wd-row>
```

### Row Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| gutter | 列元素之间的间距（单位为px） | number / string | - | 0 |
| flex | Flex布局 | boolean| - | false |
| justify | Flex 主轴对齐方式 | string| `end` `center` `space-around` `space-between` | - |
| align | Flex 交叉轴对齐方式 | string| `center` `end`  | - |

### Col Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| span | 列元素宽度 | number / string | - | 24 |
| offset | 列元素偏移距离 | number / string | - | 0 |
