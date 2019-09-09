## Progress 下拉刷新

### 按需引入

```javascript
import Vue from 'vue'
import { Progress } from 'jm-design'

Vue.use(Progress)
```

### 基本用法

设置百分比 `percentage`。

```html
<jm-progress :percentage="30" />
```

### 隐藏进度文字

设置 `hide-text` 隐藏进度文字。

```html
<jm-progress :percentage="60" hide-text>
```

### 修改颜色

设置 `color` 修改进度条颜色。

```html
<jm-progress :percentage="80" color="#00c740">
```

`color` 也可以设置为数组或者函数。数组如果只传入颜色，则自动计算每个颜色的进度边界。函数需要返回一个颜色值。

```html
<jm-progress :percentage="30" :color="[ '#00c740', '#ffb300', '#e2231a', '#0083ff' ]" />
```

数组也可以设置为以下格式：

```html
<jm-progress :percentage="30" :color="color" />

<script>
export default {
  data () {
    return {
      color: [
        {
          color: '#00c740',
          percentage: 10
        }, {
          color: '#ffb300',
          percentage: 40
        }, {
          color: '#e2231a',
          percentage: 80
        }, {
          color: '#0083ff',
          percentage: 100
        }
      ]
    }
  }
}
</script>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| percentage | 进度数值，最大值100 | number | - | 0 |
| hide-text | 隐藏进度文字 | boolean | - | false |
| color | 进度条颜色 | string / array/ function | - | '#0083ff' |


