## Loading 加载指示器

加载提示，如果要使用JS调用，请查看 Toast 章节。

### 按需引入

```javascript
import Vue from 'vue'
import { Loading } from 'wot-design'

Vue.use(Loading)
```

### 基本用法

默认为 `circle` 类型的加载指示器。

```html
<wd-loading />
```

### 修改颜色

通过 `color` 属性修改指示器的颜色。比如修改为白色，同时设置背景为黑色。

```html
<wd-loading color="#fff" class="loading-black" />
```

```css
.loading-black {
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 4px;
}
```

### 修改指示器类型

通过 `type` 修改指示器的类型，可选值为 'spinner' 和 'circle'，默认为 'circle'。

```html
<wd-loading type="spinner" />
```

### 修改指示器大小

通过 `size` 属性设置指示器的大小，默认为 '32px' 大小。

```html
<wd-loading size="20px" />
<wd-loading size="30px" />
<wd-loading size="50px" />
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type      |	加载指示器类型                        |	string    |	'spinner'   |	'circle'  |
| color	    | 设置加载指示器颜色                      |	string    |	-         |	'#c5c5c5' |
| size      | 设置加载指示器大小                      | string    | -          | '32px'   |

### Options

options可以为Object也可以为String

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type      |	加载指示器类型                        |	string    |	'spinner'   |	'circle'  |