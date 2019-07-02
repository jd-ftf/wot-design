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

