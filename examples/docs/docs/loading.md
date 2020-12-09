## Loading 加载指示器

加载提示，如果要使用JS调用，请查看 Toast 章节。

### 按需引入

```javascript
import Vue from 'vue'
import { Loading } from 'wot-design'

Vue.use(Loading)
```

### 基本用法

基本用法，适用于按钮加载状态和页面轻提示。

```html
<wd-loading></wd-loading>
```

### 修改指示器类型

通过 `type` 修改指示器的类型，可选值为 'outline'，适用于通用模块加载。

```html
<wd-loading type="outline" />
```

### 修改颜色

通过 `color` 属性修改指示器的颜色。比如修改为白色，同时设置背景为黑色。

:::warning
默认类型设置指示器颜色必须为16进制色值，且不接受色值缩写，默认类型的 loading 需要计算拖尾颜色，计算是通过十六进制换算计算的。其他类型的 loading 可以使用任意色值写法。
:::

```html
<wd-loading color="#ffffff"></wd-loading>

<!-- 错误写法 -->
<wd-loading color="#fff"></wd-loading>
<wd-loading color="green"></wd-loading>
<wd-loading color="rgba(255,255,255,1)"></wd-loading>
```

```css
.loading-black {
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 4px;
}
```

### 修改指示器大小

通过 `size` 属性设置指示器的大小，默认为 '32px' 大小。

```html
<wd-loading size="20px"></wd-loading>
<wd-loading size="30px"></wd-loading>
<wd-loading size="50px"></wd-loading>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type      | 加载指示器类型 | string | 'outline'  | 'ring'  |
| color     | 设置加载指示器颜色 | string | - | '#4D80F0' |
| size      | 设置加载指示器大小 | string    | - | '32px' |
