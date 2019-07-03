## Swipe 轮播图

### 按需引入

```javascript
import Vue from 'vue'
import { Swipe, SwipeItem } from 'jm-design'

Vue.use(Swipe)
Vue.use(SwipeItem)
```

### 基本用法

默认自动轮播，并且循环轮播，轮播时间为 3000 ms。

```html
<jm-swipe>
  <jm-swipe-item v-for="item in 4" :key="item">
    {{ item }}
  </jm-swipe-item>
</jm-swipe>
```

设置 `autoplay` 为 `false`，`loop` 为 `false`，关闭自动轮播和循环轮播。

```html
<jm-swipe :loop="false" :autoplay="false">
  <jm-swipe-item v-for="item in 4" :key="item">
    {{ item }}
  </jm-swipe-item>
</jm-swipe>
```

### space 留白

设置 `space` 留白比例，则轮播子项的宽度为 `父元素宽度 * (1 - space留白率)`，`父元素宽度 * space留白率 / 2` 则为子项距离左右边缘的距离。如例子中设置
`space` 为 `80/750`，则是以 `iphone6` 尺寸的设计稿，左右各留 `20像素`（iphone6 物理像素为 375px）。

```html
<jm-swipe hide-indicators :autoplay="false" :space="80/750">
  <jm-swipe-item v-for="item in imgs" :key="item">
    <img :src="item" class="swipe-img" />
  </jm-swipe-item>
</jm-swipe>
```

如果设置留白，则默认会将 `loop` 关闭，暂时没有补齐左右循环用的占位项。

### 指示器

默认的指示器是在轮播图底部居中。你可以使用 `hide-indicators` 关闭指示器。

如果想要自定义指示器的样式，可以使用 `indicators` 的 `slot` 插槽，同时监听轮播图的 `change` 事件，来获取当前的轮播项下标。

```html
<jm-swipe @change="handleItemChange">
  <jm-swipe-item v-for="item in 4" :key="item">
    {{ item }}
  </jm-swipe-item>
  <template #indicators>
    <div class="custom-indicators">
      {{ customIndex + 1 }}/4
    </div>
  </template>
</jm-swipe>

<script>
export default {
  data () {
    return {
      customIndex: 0
    }
  },
  methods: {
    handleItemChange (index) {
      this.customIndex = index
    }
  }
}
</script>
```

### 纵向轮播

设置 `vertical` 属性，同时给轮播图设置高度 `height` 属性，如果是横向轮播，可以不用设置 `height` 属性。

```html
<jm-swipe vertical height="150px">
  <jm-swipe-item v-for="item in 4" :key="item">
    {{ item }}
  </jm-swipe-item>
</jm-swipe>
```

### Swipe Arrtibutes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| autoplay | 自动轮播 | boolean | - | true |
| interval | 自动轮播时间，单位 ms | number | - | 3000 |
| duration | 轮播动画时间，单位 ms | number | - | 500 |
| initial-index | 轮播初始下标 | number | - | 0 |
| loop | 是否循环轮播，当设置了 space 属性，则不循环轮播 | boolean | - | true |
| hide-indicators | 隐藏指示器 | boolean | - | false |
| indicator-color | 指示器颜色 | string | - | rgba(0, 0, 0, 0.3) |
| indicator-active-color | 指示器高亮颜色 | string | - | #fff |
| touchable | 是否支持手势滑动 | boolean | - | true |
| vertical | 纵向轮播 | boolean | - | false |
| height | 轮播高度 | string | - | - |
| space | 留白率，轮播子项左右留白总和 / 轮播宽度 得出 | number | - | - |
