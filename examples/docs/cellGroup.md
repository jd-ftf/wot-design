## CellGroup

### 按需引入

```javascript
import Vue from 'vue'
import { CellGroup } from 'jm-design'

Vue.use(CellGroup)
```

### 基本用法

```html
    <jm-cell-group title="分类一">
      <i slot="left" class="jm-icon-star-fill"></i>
      <div slot="right"><i class="jm-icon-star-fill"></i><jm-button type="text">订购</jm-button></div>
      <jm-cell title="标题文字" icon="jm-icon-star-fill" value="带 icon"></jm-cell>
      <jm-cell icon="jm-icon-star-fill">
        <span>title</span>
        <span slot="title">标题文字<label class="end-time">还有25天到期</label></span>
      </jm-cell>
    </jm-cell-group>
```

### Arrtibute

| 参数      | 说明                                                | 类型        | 可选值       | 默认值   |
|---------- |--------------------------------------------------- |---------- |------------- |-------- |
title-------|	title of the cellGroup----------------------------------| String----|




###Slot

left 左侧显示内容
right 右侧显示内容
