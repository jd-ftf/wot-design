## PullRefresh 下拉刷新

### 按需引入

```javascript
import Vue from 'vue'
import { PullRefresh } from 'jm-design'

Vue.use(PullRefresh)
```

### 基本用法

```html
<template>
  <jm-pull-refresh v-model="isLoading" @refresh="refresh" tip-text="刷新成功">
    <div class="refresh-list">
      <div v-for="(item, index) in list" :key="index" class="refresh-list-item">
        <img :src="item.img" />
        <div>{{ item.text }}</div>
      </div>
    </div>
  </jm-pull-refresh>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      list: [ ... ]
    }
  },
  methods: {
    refresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value / v-model      |	是否正在加载                |	boolean    |	—           |	—       |
| top-pull-text	    | 下拉提示文案                      |	string    |	-         |	'下拉刷新' |
| top-drop-text      | 释放提示文案                  | string | - | '释放刷新' |
| top-loading-text   | 加载提示文案                  | string | - | '正在刷新' |
| top-distance       | 下拉多长距离可以触发刷新        | number | - | 50 |
| max-distance       | 最大可以拖动的距离，0表示无限制  | number | - | 0 |
| tip-text           | 提示文案信息，如果为空则不展示                  | string | - | - |
| disabled           | 是否禁止拖动，对于页面中有其他拖动组件如轮播图，则为了保证2个组件拖动不互相影响，建议在1个拖动时禁止另1个拖动                  | boolean | - | false |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| refresh        | 加载事件                    | -       |
| top-status-change         | 头部状态变化（下拉、释放、加载中）                     | status（状态）       |
| dragging       | 拖拽中事件                      | distance（距离）       |
| drag-end        | 拖拽结束事件                   | status（状态）       |
