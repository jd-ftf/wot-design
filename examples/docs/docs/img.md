## Img 图片

增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示

### 按需引入

```javascript
import Vue from 'vue'
import { Img } from 'wot-design'

Vue.use(Img)
```

### 基本用法

基础用法与原生img标签一致，可以设置src、width、height、alt等原生属性

```html
<wd-img
  width="100"
  height="100"
  src="../assets/img/dog.png"
/>
```

### 填充模式

通过fit属性可以设置图片填充模式，可选值见下方表格

```html
<wd-img
  width="100"
  height="100"
  fit="contain"
  src="../assets/img/dog.png"
/>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| src | 图片链接 | string | - | - |
| fit   |	填充模式                        |	string     | 'contain', 'cover', 'fill', 'none', 'scale-down'|	cover  |
| round	    | 是否显示为圆形                  |	boolean    |	true, false         |	false |


