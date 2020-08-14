## Anchor 动作面板

### 按需引入

```javascript
import Vue from 'vue'
import { Anchor } from 'wot-design'

Vue.use(Anchor)
```

### 基本用法

`v-model` 为绑定选中的id值。
`data` 为标题的内容和id值，和插槽内容部分id对应。

```html
<wd-anchor :data="data" v-model="value">
  <div class="anchor-content">
    <div v-for="item in data" :id="item.id">{{item.title}}的内容</div>
  </div>
</wd-anchor>

<script>
export default {
  data () {
    return {
      data: [
        {
          id: '0',
          title: '标签一'
        },
        {
          id: '1',
          title: '标签二'
        },
        {
          id: '2',
          title: '标签三'
        }
      ],
      value: '0'
    }
  }
}
</script>
```

### 点击事件

监听页签的点击事件.

```html
<wd-anchor :data="data" v-model="value" @click="handleClick">
  <div class="anchor-content">
    <div v-for="item in data" :id="item.id">{{item.title}}的内容</div>
  </div>
</wd-anchor>

<script>
export default {
  data () {
    return {
      data: [
        {
          id: '0',
          title: '标签一'
        },
        {
          id: '1',
          title: '标签二'
        }
      ],
      value: '0'
    }
  },
  methods: {
    handleClick (index) {
      this.$toast(`点击了标签${index + 1}`)
    }
  }
}
</script>
```

### Anchor Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值(对应选中的id) | string | - | - |
| data | 标签内容 | array | - | - |
| slidable-num | 可滑动的标签数阈值 | number | - | 6 |
| offset-top | 粘性布局时距离窗口顶部距离 | number | - | 0 |
| container-offset-top | 内容距离窗口顶部距离 | number | - | 0 |

### Anchor Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 绑定值变化时触发 | 下标index |
| click | 点击标题时触发 | 下标index |


### Anchor Slot

| name      | 说明       |
|------------- |----------- |
| default | 内容插槽 |

### data 数据结构

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| id | 标题的id值 | string | - | - |
| title | 标题 | string | - | - |