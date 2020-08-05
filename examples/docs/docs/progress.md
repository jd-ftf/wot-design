## Progress 进度条

### 按需引入

```javascript
import Vue from 'vue'
import { Progress } from 'wot-design'

Vue.use(Progress)
```

### 基本用法

设置百分比 `percentage`。

```html
<wd-progress :percentage="30"></wd-progress>
```

### 隐藏进度文字

设置 `hide-text` 隐藏进度文字。

```html
<wd-progress :percentage="60" hide-text></wd-progress>
```

### 修改颜色

设置 `color` 修改进度条颜色。

```html
<wd-progress :percentage="80" color="#00c740"></wd-progress>
```

`color` 也可以设置为数组或者函数。数组如果只传入颜色，则自动计算每个颜色的进度边界。函数需要返回一个颜色值。

```html
<wd-progress :percentage="30" :color="[ '#00c740', '#ffb300', '#e2231a', '#0083ff' ]"></wd-progress>
```

数组也可以设置为以下格式：

```html
<wd-progress :percentage="30" :color="color"></wd-progress>

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

### 设置图标

设置 `icon` 右侧图标，也可以使用 'icon' 的 slot 插槽。

```html
<wd-progress icon="wd-icon-check-outline" :percentage="100" color="#0083ff" hide-text>
</wd-progress>
<wd-progress :percentage="60" color="#e2231a" hide-text>
  <span slot="icon">
    <wd-icon name="close-outline" size="18px" color="#e2231a"/>
  </span>
</wd-progress>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| percentage | 进度数值，最大值100 | number | - | 0 |
| hide-text | 隐藏进度文字 | boolean | - | false |
| color | 进度条颜色 | string / array/ function | - | 'linear-gradient(315deg, rgba(81,124,240,1) 0%,rgba(118,158,245,1) 100%)' |
| icon | 右侧图标 | String | - | - |

### Slot

| name      | 说明       |
|------------- |----------- |
| icon | 图标 |
