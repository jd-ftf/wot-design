## Icon 图标

图标都是 icon font 字体，直接使用类名 `jm-icon-xxx` 即可使用；也提供了组件供调用。

### 使用

#### 按需引入

```javascript
import Vue from 'vue'
import { Icon } from 'jm-design'

Vue.use(Icon)
```

#### 示例

```html
<jm-icon name="add-circle" />

<!-- 修改颜色和字体大小 -->
<jm-icon name="add-circle" color="#0083ff" size="20px" />

<!-- 修改渲染的标签，默认用 i 标签进行渲染 -->
<jm-icon name="add-circle" tag="div" />
```

只要引入了 icon 的样式文件，即可使用图标的类名

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