## Tabbar 标签栏

### 按需引入

```javascript
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'wot-design'

Vue.use(Tabbar)
Vue.use(TabbarItem)
```

### 基本用法

`v-model` 为绑定值，可以为 number 类型（下标）和 string 类型（标签栏名）。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item icon="wd-icon-bags">服务</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-dong">咚咚</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-chat">我</wd-tabbar-item>
</wd-tabbar>

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
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item icon="wd-icon-bags" dot>服务</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-dong" value="new">咚咚</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-chat" :value="7">我</wd-tabbar-item>
</wd-tabbar>
```

### 修改颜色

支持修改标签栏颜色和角标颜色。

```html
<wd-tabbar v-model="tabbar" active-color="#f00" badge-color="#0083ff">
  <wd-tabbar-item icon="wd-icon-bags" dot>服务</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-dong">咚咚</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-chat">我</wd-tabbar-item>
</wd-tabbar>
```

### 修改选中icon

支持修改标签栏颜色和角标颜色。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item icon="wd-icon-bags" active-icon="wd-icon-read" dot>服务</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-dong" active-icon="wd-icon-read">咚咚</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-chat" active-icon="wd-icon-read">我</wd-tabbar-item>
</wd-tabbar>
```

### 路由模式

支持路由模式，设置 to 属性，可以为链接、router的path字符串、router的路由对象。如果 to 的值不属于路由，则判定为链接。

```html
<wd-tabbar>
  <wd-tabbar-item icon="wd-icon-bags" to="/tabbar">标签栏</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-dong" to="/button">按钮</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-chat" to="https://m.jd.com">京东</wd-tabbar-item>
</wd-tabbar>
```

### fixed 定位和边框

服务 `fixed` 属性和 `border` 边框属性。

```html
<wd-tabbar v-model="tabbar" fixed border>
  <wd-tabbar-item icon="wd-icon-bags">服务</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-dong">咚咚</wd-tabbar-item>
  <wd-tabbar-item icon="wd-icon-chat">我</wd-tabbar-item>
</wd-tabbar>
```

### Tabbar Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| value/v-model | 绑定值 | string / number | - | - | - |
| active-color | 选中值颜色 | string | - | #4D80F0 | - |
| inactive-color | 未选中的颜色 | string | - | rgba(51, 51, 51, 1) | - |
| badge-color | 角标的颜色 | string | - | #fa4350 | - |
| fixed | 绝对定位 | boolean | - | false | - |
| border | 显示上边框 | boolean | - | false | - |

### Tabbar Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| change | 绑定值变化时触发 | 下标index, 标题名称name | - |
| click | 点击标题时触发 | 下标index, 标题名称name | - |

### TabbarItem Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|---------|
| name | 标签栏名称 | string | - | - | - |
| icon | 图标类名 | string | - | - | - |
| active-icon | 选中图标类名 | string | - | - | - |
| dot | 是否显示小圆点 | boolean | - | false | - |
| top | 为正时，角标向下偏移对应的像素 | number | - | - | - |
| right | 为正时，角标向左偏移对应的像素 | number | - | - | - |
| value | 文字或者数字角标 | string / number | - | - | - |
| max | 数字角标的最大值 | number | - | - | - |
| to | 路由地址，可以为链接或者为router中的路由 | string / number | - | - | - |
| replace | 跳转时是否替换当前路由历史 | boolean | - | fasle | - |

### TabbarItem Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| icon | 图标 | - |
