## Slider 滑块

支持单向滑块和双向滑块。

### 按需引入

```javascript
import Vue from 'vue'
import { Slider } from 'wot-design'

Vue.use(Slider)
```

### 基本用法

`v-model` 为绑定值。如果为 number 类型则显示一个滑块，如果为 array 类型则显示两个滑块。

```html
<wd-slider v-model="value"></wd-slider>

<script>
export default {
  data () {
    return {
      value: 30
    }
  }
}
</script>
```

双滑块。

```html
<wd-slider v-model="value"></wd-slider>

<script>
export default {
  data () {
    return {
      value: [20, 40]
    }
  }
}
</script>
```

### 最大值最小值

设置 `min` 最小值，`max` 最大值。

```html
<wd-slider :min="4" :max="677" v-model="value"></wd-slider>
```

### 隐藏文案

设置 `hide-label` 隐藏滑块当前值。

```html
<wd-slider v-model="value" hide-label></wd-slider>
```

设置 `hide-min-max` 隐藏最大最小值。

```html
<wd-slider v-model="value" hide-min-max></wd-slider>
```

### 禁用

设置 `disabled` 属性。

```html
<wd-slider v-model="value" disabled></wd-slider>
```

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value / v-model      |	滑块值，如果为array，则为双向滑块                |	number / array    |	—           |	—       |
| hide-min-max	    | 是否显示左右的最大最小值                      |	boolean    |	-         |	false |
| hide-label      | 是否显示当前滑块值                  | boolean | - | false |
| disabled   | 是否禁用                  | boolean | - | false |
| max      | 最大值        | number | - | 100 |
| min       | 最小值  | number | - | 0 |
| step           | 步进值        | number | - | 1 |
| activeColor           | 进度条激活背景颜色        | string | - | '#0084ff' |
| inactiveColor           | 进度条未激活背景颜色        | string | - | '#e5e5e5' |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| dragstart        | 滑动开始事件                    | value       |
| dragmove         | 滑动移动事件                     | value      |
| dragend       | 滑动结束事件                      | value       |