## Collapse 折叠面板

### 按需引入

```javascript
import Vue from 'vue'
import { Collapse, CollapseItem } from 'jm-design'

Vue.use(Collapse)
Vue.use(CollapseItem)
```

### 基本使用

`v-model` 为绑定值，可以为 array 类型（普通折叠）、 string 类型（手风琴）和 boolean 类型（收起展开查看更多）。CollapseItem 的 `title` 和 `name` 为必填。`name` 用于标识该折叠栏。

```html
<jm-collapse v-model="value">
  <jm-collapse-item title="标签1" name="item1">
    这是一条简单的示例文字。
  </jm-collapse-item>
  <jm-collapse-item title="标签2" name="item2">
    这是一条简单的示例文字。
  </jm-collapse-item>
  <jm-collapse-item title="标签3" name="item3">
    这是一条简单的示例文字。
  </jm-collapse-item>
</jm-collapse>

<script>
export default {
  data () {
    return {
      value: [ 'item1' ]
    }
  }
}
</script>
```

### 手风琴

设置 `accordion` 属性。

```html
<jm-collapse v-model="value" accordion>
  <jm-collapse-item title="标签1" name="item1">
    这是一条简单的示例文字。
  </jm-collapse-item>
  <jm-collapse-item title="标签2" name="item2">
    这是一条简单的示例文字。
  </jm-collapse-item>
  <jm-collapse-item title="标签3" name="item3">
    这是一条简单的示例文字。
  </jm-collapse-item>
</jm-collapse>
```

### 禁用

给 CollapseItem 设置 `disabled` 属性，禁用某个折叠栏。

```html
<jm-collapse v-model="value">
  <jm-collapse-item title="标签1" name="item1">
    这是一条简单的示例文字。
  </jm-collapse-item>
  <jm-collapse-item title="标签2" name="item2" disabled>
    这是一条简单的示例文字。
  </jm-collapse-item>
  <jm-collapse-item title="标签3" name="item3">
    这是一条简单的示例文字。
  </jm-collapse-item>
</jm-collapse>
```

### 查看更多

Collapse 可以单独使用，通过设置 `viewmore` 属性，将其转化为查看更多的折叠类型，同时可以设置 `line-num` 修改收起时的显示行数。这时候的 `v-model` 为 boolean 类型。

```html
<jm-collapse viewmore v-model="value">
  这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
</jm-collapse>
```

### Collapse Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值 | string / array / boolean | - | - |
| accordion | 手风琴 | boolean | - | false |
| viewmore | 查看更多的折叠面板 | boolean | - | false |
| line-num | 查看更多的折叠面板，收起时的显示行数 | number | - | 2 |

### Collapse Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 绑定值变化时触发 | value |

### Collapse Slot

| name      | 说明       |
|------------- |----------- |
| more | 查看更多，便于开发者自定义查看更多类型的展开收起样式 |

### CollapseItem Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| name | 折叠栏的标识符 | string | - | - |
| title | 折叠栏的标题 | string | - | - |
| disabled | 禁用折叠栏 | boolean | - | false |