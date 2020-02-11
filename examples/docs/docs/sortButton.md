## SortButton 排序按钮

### 引入

```javascript
import Vue from 'vue'
import { SortButton } from 'wot-design'

Vue.use(SortButton)
```

### 基本用法

> `v-model` 为必选值

使用 `v-model` 绑定组件展示状态，其值为：`-1、0、1`，分别代表：升序、未选中状态、降序。

```html
<wd-sort-button v-model="value1" title="价格"/>
```
```javascript
export default {
  data () {
    return {
      value1: 0,
    }
  }
}
```

### 按钮重置

双箭头状态下通过设置 `allow-reset` 允许重置按钮为未选中状态。

```html
<wd-sort-button
  v-model="value1"
  allow-reset
  title="价格"
/>
```
```javascript
export default {
  data () {
    return {
      value1: 0,
    }
  }
}
```

### 仅展示单箭头

通过设置 `one-arrow` 仅展示单箭头。单箭头始终处于选中状态，且默认状态为升序。

```html
<wd-sort-button
  v-model="value1"
  one-arrow
  title="价格"
/>
```
```javascript
export default {
  data () {
    return {
      value1: 0,
    }
  }
}
```

### 修改选中颜色

可以通过设置 `color` 来修改选中状态的颜色。

```html
<wd-sort-button
  v-model="value1"
  color="#00c740"
  title="价格"
/>
```
```javascript
export default {
  data () {
    return {
      value1: 0,
    }
  }
}
```

### 修改文案选中颜色

如果箭头处于选中状态，文案相应的也处于选中状态。默认情况下文案的选中颜色跟随箭头的选中颜色，可以通过设置 `title-color` 覆盖。

```html
<wd-sort-button
  v-model="value1"
  title-color="#ff0000"
  title="价格"
/>
```
```javascript
export default {
  data () {
    return {
      value1: 0,
    }
  }
}
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 选中的箭头方向：-1 升序，0 重置状态，1 降序。 | number | -1,0,1 | - |
| title | 排序按钮展示的文案。 | string | — |	— |
| color | 箭头/文案选中时的整体颜色。 | sting | 十六进制 | #0083ff |
| title-color | 文案选中时的颜色，优先级高于 color。 | string | 十六进制 |	— |
| one-arrow | 是否只显示一个箭头。 | boolean |	- |	false |
| allow-reset | 展示双箭头时，允许手动重置按钮。 | boolean | - | false |
