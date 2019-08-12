## Tabbar 标签栏

### 按需引入

```javascript
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'jm-design'

Vue.use(Tabbar)
Vue.use(TabbarItem)
```

### 基本用法

`v-model` 为绑定值，可以为 number 类型（下标）和 string 类型（标签栏名）。

```html
<jm-tabbar v-model="tabbar">
  <jm-tabbar-item icon="jm-icon-cart">购物车</jm-tabbar-item>
  <jm-tabbar-item icon="jm-icon-collect">收藏</jm-tabbar-item>
  <jm-tabbar-item icon="jm-icon-person">我</jm-tabbar-item>
</jm-tabbar>

<script>
export default {
  data () {
    return {
      tabbar: 0
    }
  }
}
</script>
```

### 显示角标

支持 dot 角标，字符串角标和数字角标。

```html
<jm-tabbar v-model="tabbar">
  <jm-tabbar-item icon="jm-icon-cart" dot>购物车</jm-tabbar-item>
  <jm-tabbar-item icon="jm-icon-collect" value="new">收藏</jm-tabbar-item>
  <jm-tabbar-item icon="jm-icon-person" :value="7">我</jm-tabbar-item>
</jm-tabbar>
```

### 修改颜色

支持修改标签栏颜色和角标颜色。

```html
<jm-tabbar v-model="tabbar" active-color="#f00" badge-color="#0083ff">
  <jm-tabbar-item icon="jm-icon-cart" dot>购物车</jm-tabbar-item>
  <jm-tabbar-item icon="jm-icon-collect">收藏</jm-tabbar-item>
  <jm-tabbar-item icon="jm-icon-person">我</jm-tabbar-item>
</jm-tabbar>
```

### 路由模式

支持路由模式，设置 to 属性，可以为链接、router的path字符串、router的路由对象。如果 to 的值不属于路由，则判定为链接。

```html
<jm-tabbar>
  <jm-tabbar-item icon="jm-icon-cart" to="/tabbar">标签栏</jm-tabbar-item>
  <jm-tabbar-item icon="jm-icon-collect" to="/button">按钮</jm-tabbar-item>
  <jm-tabbar-item icon="jm-icon-person" to="https://m.jd.com">京东</jm-tabbar-item>
</jm-tabbar>
```

### fixed 定位和边框

设置 `fixed` 属性和 `border` 边框属性。

```html
<jm-tabbar v-model="tabbar" fixed border>
  <jm-tabbar-item icon="jm-icon-cart">购物车</jm-tabbar-item>
  <jm-tabbar-item icon="jm-icon-collect">收藏</jm-tabbar-item>
  <jm-tabbar-item icon="jm-icon-person">我</jm-tabbar-item>
</jm-tabbar>
```

### Tabbar Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 绑定值 | string / number | - | - |
| active-color | 选中值颜色 | string | - | '#0083ff' |
| inactive-color | 未选中的颜色 | string | - | '#a7a7a7' |
| badge-color | 角标的颜色 | string | - | '#e2231a' |
| fixed | 绝对定位 | boolean | - | false |
| border | 显示上边框 | boolean | - | false |

### Tabbar Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 绑定值变化时触发 | 下标index, 标题名称name |
| click | 点击标题时触发 | 下标index, 标题名称name |

### TabbarItem Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| name | 标签栏名称 | string | - | - |
| icon | 图标类名 | string | - | - |
| dot | 是否显示小圆点 | boolean | - | false |
| value | 文字或者数字角标 | string / number | - | - |
| max | 数字角标的最大值 | number | - | - |
| to | 路由地址，可以为链接或者为router中的路由 | string / number | - | - |
| replace | 跳转时是否替换当前路由历史 | boolean | - | fasle |

### TabbarItem Slot

| name      | 说明       |
|------------- |----------- |
| icon | 图标 |
