## Badge 标记

### 按需引入

```javascript
import Vue from 'vue'
import { Badge } from 'jm-design'

Vue.use(Badge)
```

出现在按钮、图标旁的数字或状态标记。

### 基础用法
展示新消息数量。

定义`value`属性，它接受`Number`或者`String`。

```html
<jm-badge :value="12" class="item">
  <jm-button size="small">评论</jm-button>
</jm-badge>
<jm-badge :value="3" class="item" bgColor="pink">
  <jm-button size="small">回复</jm-button>
</jm-badge>
<jm-badge :value="1" class="item" type="primary">
  <jm-button size="small">评论</jm-button>
</jm-badge>
<jm-badge :value="2" class="item" type="warning">
  <jm-button size="small">回复</jm-button>
</jm-badge>

<style>
.item{
    margin-top:10px;
    margin-right:25px;
  }
</style>
```

### 最大值
可自定义最大值。

 由`max`属性定义，它接受一个`Number`，需要注意的是，只有当`value`为`Number`时，它才会生效。

```html
<jm-badge :value="200" :max="99" class="item">
  <jm-button size="small">评论</jm-button>
</jm-badge>
<jm-badge :value="100" :max="10" class="item">
  <jm-button size="small">回复</jm-button>
</jm-badge>

<style>
.item{
    margin-top:10px;
    margin-right:25px;
  }
</style>
```


### 自定义内容
可以显示数字以外的文本内容。

 定义`value`为`String`类型是时可以用于显示自定义文本。

```html
<jm-badge value="new" class="item" bgColor="red">
  <jm-button size="small">评论</jm-button>
</jm-badge>
<jm-badge value="hot" class="item">
  <jm-button size="small">回复</jm-button>
</jm-badge>

<style>
.item{
    margin-top:10px;
    margin-right:25px;
  }
</style>
```


### 小红点
以红点的形式标注需要关注的内容。

 除了数字外，设置`is-dot`属性，它接受一个`Boolean`。

```html
<jm-badge is-dot class="item">数据查询</jm-badge>
<jm-badge is-dot class="item">
  <jm-button class="share-button"  type="primary"></jm-button>
</jm-badge>

<style>
.item{
    margin-top:10px;
    margin-right:25px;
  }
</style>
```


### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| value        | 显示值           | string, number  |          —            |    —    |
| max          | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型    | number  |         —              |     —    |
| is-dot       | 小圆点           | boolean         |         —             |  false  |
| hidden       | 隐藏 badge       | boolean         |         —             |  false  |
| type         | 类型             | string          | primary / success / warning / danger / info |    —    |
| bgColor    | 类型             | string          | 各种颜色的css写法 |    —    |

