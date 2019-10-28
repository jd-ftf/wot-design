## Icon 图标

图标都是 icon font 字体，直接使用类名 `jm-icon-xxx` 即可使用；也提供了组件供调用。

### 按需引入

```javascript
import Vue from 'vue'
import { Icon } from 'jm-design'

Vue.use(Icon)
```

### 基本用法

通过 `name` 属性设置使用哪个图标。

```html
<jm-icon name="add-circle" />
```

### 图标颜色

设置 `color` 属性。

```html
<jm-icon name="add-circle" color="#0083ff" />
```

### 图标大小

设置 `size` 属性。

```html
<jm-icon name="add-circle" size="20px" />
```

### 渲染的标签

通过设置 `tag` 属性，选择使用哪个标签来渲染图标。

```html
<jm-icon name="add-circle" tag="div" />
```

### 类名使用

只要引入了 icon 的样式文件，即可使用图标的类名。

```html
<i class="jm-icon-add-circle"></i>
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|name      |	使用的图标名字                                |	string    |	—           |	—       |
|color	    | 图标的颜色                      |	string    |	-         |	inherit |
|size      | 图标的字体大小                   | string | -       | inherit |
|tag       | 渲染的标签                      | string | - | i |