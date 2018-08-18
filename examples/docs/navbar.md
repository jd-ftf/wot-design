## Navbar

顶部导航栏，支持深色背景和白色背景，如果要自定义背景色，请根据 `自定义主题` 章节进行自定义

### 使用

#### 按需引用

```javascript
import Vue from 'vue
import { Navbar } from 'jm-design'

Vue.use(Navbar)
```

#### CDN按需引用

```html
<!-- CSS引用 -->
<link rel="stylesheet" href="//jm-static.jd.com/jmdesign/navbar.css">
<!-- JS引用 -->
<script src="//jm-static.jd.com/jmdesign/navbar.js">
```

#### 示例

:::demo link=/navbar
```html
<!-- 左右无操作 -->
<jm-navbar title="标题"></jm-navbar>

<!-- 仅左侧文字 -->
<jm-navbar title="左侧文字">
  <span slot="left">返回</span>
</jm-navbar>

<!-- 仅右侧文字 -->
<jm-navbar title="左侧文字">
  <span slot="right">菜单</span>
</jm-navbar>

<!-- 左右文字 -->
<jm-navbar title="左右侧文字">
  <span slot="left">返回</span>
  <span slot="right">菜单</span>
</jm-navbar>

<!-- 标题过长则超出省略 -->
<jm-navbar title="标题的字数如果太多则超出隐藏">
  <span slot="left">返回</span>
</jm-navbar>

<!-- 白色背景，添加 light 属性 -->
<jm-navbar title="左右侧文字" light>
  <span slot="left">返回</span>
  <span slot="right">菜单</span>
</jm-navbar>
```
:::

### Attributes
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|title      |	标题                                |	string    |	—           |	—       |
|light	    | 是否使用白色背景                      |	boolean    |	-         |	false |

### Slot
| name      | 说明       |
|------------- |----------- |
|left         | 左侧操作 |
|right        | 右侧操作 |
