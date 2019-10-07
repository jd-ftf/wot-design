## ActionSheet 上拉菜单

### 按需引入

```javascript
import Vue from 'vue'
import { ActionSheet } from 'jm-design'

Vue.use(ActionSheet)
```

### 基本用法

`v-model` 为绑定值，表示是否展示菜单。

```html
<jm-button type="primary" plain @click="show = true">弹出菜单</jm-button>
<jm-action-sheet v-model="show" :actions="actions" />

<script>
export default {
  data () {
    return {
      show: false,
      actions: [
        {
          name: '选项1'
        }, {
          name: '选项2'
        }, {
          name: '选项3',
          subname: '描述信息'
        }
      ]
    }
  }
}
</script>
```

### 选项状态

可以设置 颜色、禁用、加载 等状态。

```html
<jm-button type="primary" plain @click="show = true">弹出菜单</jm-button>
<jm-action-sheet v-model="show" :actions="actions" />

<script>
export default {
  data () {
    return {
      show: false,
      actions: [
        {
          name: '颜色',
          color: '#0083ff'
        }, {
          name: '禁用',
          disabled: true
        }, {
          loading: true
        }
      ]
    }
  }
}
</script>
```

### 取消按钮

设置 `cancel-text` 取消按钮文案，展示取消按钮。

```html
<jm-action-sheet v-model="show" :actions="actions" cancel-text="取消" />
```

### 标题

设置 `title` 展示标题。

```html
<jm-action-sheet v-model="show" title="标题">
  <p style="padding: 15px 15px 150px 15px;">内容</p>
</jm-action-sheet>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值，展示/关闭菜单 | boolean | - | - |
| actions | 菜单选项 | array | - | [] |
| title | 标题 | string | - | - |
| cancel-text | 取消按钮文案 | string | - | - |
| close-on-click-action | 点击选项后是否关闭菜单 | boolean | - | true |
| lock-scroll | 锁定背景滚动 | boolean | - | true |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | 
| duration | 动画持续时间 | number | - | 300(ms) |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| select | 点击选项时触发 | item: 选项对象, index: 选项下标 |
| open | 弹出层打开时触发 | - |
| opened | 弹出层打开动画结束时触发 | - |
| close | 弹出层关闭时触发 | - |
| closed | 弹出层关闭动画结束时触发 | - |
| click-modal | 点击遮罩时触发 | - |
| cancel | 点击取消按钮时触发 | - |

### Action 数据结构

| 键名 | 说明 | 类型 |
|----- |----- |----- |
| name | 选项名称 | string |
| subname | 描述信息 | string |
| color | 颜色 | string |
| disabled | 禁用 | boolean |
| loading | 加载中状态 | boolean |
