## InfiniteLoad 无限加载

### 按需引入

```javascript
import Vue from 'vue'
import { InfiniteLoad } from 'jm-design'

Vue.use(InfiniteLoad)
```

### 基本用法

在需要进行加载的列表的底部引入该组件即可。`loadmore` 当滑动到列表底部时，会调用该函数进行数据请求。
`loading` 设置加载状态。如果没有更多数据了，通过 `ref` 调用该组件上面的 `loadEnd` 方法。


```html
<template>
  <div class="list-container">
    <div class="list">
      <div v-for="(item, index) in list" :key="index" class="list-item">
        <img :src="item.img" />
        <div>{{ item.text }}</div>
      </div>
    </div>
    <jm-infinite-load ref="loadmore" @loadmore="loadmore" :loading="loading" />
  </div>
</template>

<script>
import Dog from '../assets/img/dog.png'

export default {
  data () {
    return {
      list: [],
      num: 0,
      loading: false,
      time: 3
    }
  },
  methods: {
    loadmore () {
      this.loading = true

      if (this.time) {
        setTimeout(() => {
          let list = []
          this.num += 15
          for (let i = this.num - 15; i < this.num; i++) {
            list.push({
              img: Dog,
              text: `这是一条测试${i + 1}`
            })
          }
          this.list = this.list.concat(list)
          this.loading = false
          // 模拟请求，请求3次，3次结束后设置加载结束
          this.time--
        }, 1000)
      } else {
        this.$refs.loadmore.loadEnd()
      }
    }
  }
}
</script>
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| loading      |	是否正在加载                |	boolean    |	—           |	—       |
| loading-text    | 加载提示文案                      |	string    |	-         |	'加载中...' |
| finished-text      | 全部加载完的提示文案                  | string | - | '没有更多了' |
| error-text  | 加载失败的提示文案                  | string | - | '加载失败，点击重试' |
| offset       | 距离底部多少距离触发加载事件        | number | - | 50 |
| immediate-check       | 是否一开始便马上检查是否应该加载  | boolean | - | true |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| loadmore        | 加载事件                    | -       |

### Methods

| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| loadEnd      | 加载结束，在没有更多数据时需要手动调用该事件 | —  |
| loadError    | 加载失败，在请求数据失败时手动调用该事件 | -  |
