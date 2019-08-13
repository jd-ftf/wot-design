## Tab 标签页

### 按需引入

```javascript
import Vue from 'vue'
import { Tab, Tabs } from 'jm-design'

Vue.use(Tab)
Vue.use(Tabs)
```

### 基本用法

`v-model` 为绑定值，可以为 number 类型（下标）和 string 类型（标签名）。

```html
<jm-tabs v-model="tab">
  <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <p>内容{{ item }}</p>
  </jm-tab>
</jm-tabs>

<script>
export default {
  data () {
    return {
      tab: 0
    }
  }
}
</script>
```

### 滑动动画

设置 `animated` 属性，开启tab切换动画。

```html
<jm-tabs v-model="tab" animated>
  <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <p>内容{{ item }}</p>
  </jm-tab>
</jm-tabs>
```

### 粘性布局

设置 `sticky` 属性，使用粘性布局。可以设置 `offset-top` 属性，当距离窗口顶部多少像素时，固定标签头。

```html
<jm-tabs v-model="tab" sticky>
  <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <p>内容{{ item }}</p>
  </jm-tab>
</jm-tabs>
```

### 禁用Tab

在 `jm-tab` 上设置 `disabled` 属性，禁用某个页签。

```html
<jm-tabs v-model="tab">
  <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`" :disabled="item === 2">
    <p>内容{{ item }}</p>
  </jm-tab>
</jm-tabs>
```

### 点击事件

监听页签的点击事件.

```html
<jm-tabs v-model="tab" @click="handleTabClick">
  <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <p>内容{{ item }}</p>
  </jm-tab>
</jm-tabs>

<script>
export default {
  data () {
    return {
      tab: 0
    }
  },
  methods: {
    handleTabClick (index) {
      this.$toast(`点击了标签${index + 1}`)
    }
  }
}
</script>
```

### 自定义页签标题

通过 `title` 插槽自定义标题。

```html
<jm-tabs v-model="tab">
  <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <div slot="title">
      <i class="jm-icon-tickets"></i>
      <span>{{ `标签${item}` }}</span>
    </div>
    <p>内容{{ item }}</p>
  </jm-tab>
</jm-tabs>
```

### 延迟渲染

设置 `lazy-render` 属性，只有切换到当前页签时，页签的内容才会渲染。

```html
<jm-tabs v-model="tab" lazy-render>
  <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <p>内容{{ item }}</p>
  </jm-tab>
</jm-tabs>
```

### 手势滑动

设置 `swipeable` 属性，支持手势滑动。

```html
<jm-tabs v-model="tab" swipeable>
  <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`">
    <p>内容{{ item }}</p>
  </jm-tab>
</jm-tabs>
```

---

标签页在标签数大于等于6个时，可以滑动；当标签数大于等于10个时，将会显示导航地图，便于快速定位到某个标签。可以通过设置 `slidable-num` 修改可滑动的数量阈值；设置 `map-num` 修改显示导航地图的阈值。

### Tabs Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值 | string / number | - | - |
| slidable-num | 可滑动的标签数阈值 | number | - | 6 |
| map-num | 显示导航地图的标签数阈值 | number | - | 10 |
| color | 标题选中时的颜色 | string | - | '#0083ff' |
| inactive-color | 标题未选中时的颜色 | string | - | '#333' |
| sticky | 粘性布局 | boolean | - | false |
| offset-top | 粘性布局时距离窗口顶部距离 | number | - | 0 |
| animated | 开启切换动画 | boolean | - | false |
| swipeable | 开启手势滑动 | boolean | - | false |
| lazy-render | 懒渲染标签页 | boolean | - | false |
| line-width | 底部条宽度，单位像素 | number | - | auto |
| line-height | 底部条高度，单位像素 | number | - | 3 |

### Tabs Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 绑定值变化时触发 | 下标index, 标题名称name |
| click | 点击标题时触发 | 下标index, 标题名称name |
| disabled | 点击禁用的标题时触发| 下标index, 标题名称name |

### Tab Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| name | 标签页名称 | string | - | - |
| title | 标题 | string | - | - |
| disabled | 禁用 | boolean | - | false |

### Tab Slot

| name      | 说明       |
|------------- |----------- |
| title | 标题 |