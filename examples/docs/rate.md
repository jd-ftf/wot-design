## Rate 评分

### 使用

#### 按需引入

```javascript
import Vue from 'vue'
import { Rate } from 'jm-design'

Vue.use(Rate)
```

#### 示例

```html
<template>
  <div>
    <!-- 基本用法 -->
    <jm-rate v-model="rate1" />

    <!-- 只读状态 -->
    <jm-rate v-model="rate2" readonly />

    <!-- 禁用状态 -->
    <jm-rate v-model="rate3" disabled />

    <!-- 修改选中颜色 -->
    <jm-rate v-model="rate4" active-color="#FFAE16" />

    <!-- 修改icon和选中颜色 -->
    <jm-rate v-model="rate5" icon="jm-icon-good" active-icon="jm-icon-good" active-color="#0083ff" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      rate1: 5,
      rate2: 3,
      rate3: 2,
      rate4: 3.5,
      rate5: 1
    }
  }
}
</script>
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value / v-model      |	当前分数                |	number    |	—           |	—       |
| num	    | 评分最大值                      |	number    |	-         |	5 |
| readonly      | 是否只读                  | boolean | - | false |
| size   | 图标大小                  | string | - | '20px' |
| space      | 图标间距        | string | - | '4px' |
| color       | 未选中的图标颜色  | string | - | '#c5c5c5' |
| active-color           | 选中的图标颜色        | string | - | '#e2231a' |
| icon           | 未选中的图标类名                  | string | - | 'jm-icon-star' |
| active-icon    | 选中的图标类名                  | string | - | 'jm-icon-star-fill' |
| disabled           | 是否禁用                  | boolean | - | false |
| disabled-color    | 禁用的图标颜色                  | string | - | '#c5c5c5' |
