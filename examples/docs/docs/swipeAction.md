## SwipeAction 滑动操作

:::warning
滑动操作组件对页面的功能隐藏较深，用户难以发现，建议使用其他交互方式来实现操作功能，比如列表项有个按钮，点击按钮弹出 ActionSheet。

如果坚持要使用滑动操作组件，建议在用户进入页面时加上操作提示以提示用户列表项可以左右滑动。
:::

### 按需引入

```javascript
import Vue from 'vue'
import { SwipeAction } from 'wot-design'

Vue.use(SwipeAction)
```

### 基本用法

`wd-swipe-action`分为三部分：'自定义左按钮内容'、'自定义内容'、'自定义右按钮内容'。自定义按钮内容需要设置`slot`开启，自定义内容为默认插槽，无需手动开启。

```html
<wd-swipe-action>
  <wd-cell title="标题文字" value="内容"/>
  <div slot="right" class="action">
    <button class="button" style="background: #C8C7CD;" @click="handleAction('操作1')">操作1</button>
    <button class="button" style="background: #FFB300;" @click="handleAction('操作1')">操作2</button>
    <button class="button" style="background: #E2231A;" @click="handleAction('操作1')">操作3</button>
  </div>
</wd-swipe-action>
```
```javascript
export default {
  methods: {
    handleAction (action) {
      this.$toast(`点击了${action}`)
    }
  }
}
```
```css
.action {
  height: 100%;
  display: flex;
}
.button{
  display: block;
  margin: 0;
  padding: 0 11px;
  height: 100%;
  color: white;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}
```

### 禁用自动关闭

当点击 SwipeAction 以外的的部分时，滑动操作会自动关闭，此时可以通过设置`auto-close`来禁用此行为。

```html
<wd-swipe-action :auto-close="false">
  <wd-cell title="标题文字" value="内容"/>
  <div slot="right" class="action">
    <button class="button" style="background: #C8C7CD;">操作1</button>
    <button class="button" style="background: #FFB300;">操作2</button>
    <button class="button" style="background: #E2231A;">操作3</button>
  </div>
</wd-swipe-action>
```

### 左右滑动

`wd-swipe-action`组件提供`left`/`right`两个滑动按钮，通过设置插槽`slot="left"`和`slot="right"`开启。

```html
<wd-swipe-action>
  <div slot="left" class="action">
    <button class="button" style="background: #C8C7CD;">操作1</button>
    <button class="button" style="background: #FFB300;">操作2</button>
    <button class="button" style="background: #E2231A;">操作3</button>
  </div>
  <wd-cell title="标题文字" value="内容" />
  <div slot="right" class="action">
    <button class="button" style="background: #cdb86e;">操作4</button>
    <button class="button" style="background: #42ffd1;">操作5</button>
    <button class="button" style="background: #383fe2;">操作6</button>
  </div>
</wd-swipe-action>
```

### 切换按钮

可以通过设置`v-model`来控制开启关闭滑动按钮，可选值为:`left`、`close`、`right`分别表示："打开左滑动按钮"、"关闭滑动按钮""打开右滑动按钮"

```html
<wd-swipe-action v-model="value">
  <div slot="left" class="action">
    <button class="button" style="background: #C8C7CD;">操作1</button>
    <button class="button" style="background: #FFB300;">操作2</button>
    <button class="button" style="background: #E2231A;">操作3</button>
  </div>
  <wd-cell title="标题文字" value="内容"/>
  <div slot="right" class="action">
    <button class="button" style="background: #cdb86e;">操作4</button>
    <button class="button" style="background: #42ffd1;">操作5</button>
    <button class="button" style="background: #383fe2;">操作6</button>
  </div>
</wd-swipe-action>

<div class="button-group">
  <wd-button @touchstart.native.capture.stop="changeState('left')">打开左边</wd-button>
  <wd-button @touchstart.native.capture.stop="changeState('close')">关闭所有</wd-button>
  <wd-button @touchstart.native.capture.stop="changeState('right')">打开右边</wd-button>
</div>
```
```javascript
export default {
  data () {
    return {
      value: 'close'
    }
  },
  methods: {
    changeState (value) {
      this.value = value
    }
  }
}
```
```css
  .button-group{
    padding: 10px;
    background: white;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
```

### 按钮关闭前的钩子函数

> 注意`before-close`函数体内`this`的指向。

通过`before-close`属性传入一个函数，回调函数会在滑动按钮关闭前执行。钩子函数接收两个参数:`reason`、`position`。
`reason`表示滑动按钮关闭的原因，值为:`click`、`swipe`、`state`，分别代表:点击关闭按钮、滑动关闭按钮、通过控制`v-model`关闭按钮;
`position`代表被关闭的操作按钮，值为：`left`、`right`。当`reason`为`click`时，表示点击`position`位置关闭滑动按钮，值为：`left`、`right`、`inside`、`outside`。

```html
<wd-swipe-action v-model="value" :before-close="beforeClose">
  <div slot="left" class="action">
    <button class="button" style="background: #C8C7CD;">操作1</button>
    <button class="button" style="background: #FFB300;">操作2</button>
    <button class="button" style="background: #E2231A;">操作3</button>
  </div>
  <wd-cell title="标题文字" value="内容"/>
  <div slot="right" class="action">
    <button class="button" style="background: #cdb86e;">操作4</button>
    <button class="button" style="background: #42ffd1;">操作5</button>
    <button class="button" style="background: #383fe2;">操作6</button>
  </div>
</wd-swipe-action>

<div class="button-group">
  <wd-button @touchstart.native.capture.stop="changeState('left')">打开左边</wd-button>
  <wd-button @touchstart.native.capture.stop="changeState('close')">关闭所有</wd-button>
  <wd-button @touchstart.native.capture.stop="changeState('right')">打开右边</wd-button>
</div>
```
```javascript
export default {
  data () {
    return {
      value: 'close'
    }
  },
  methods: {
    beforeClose (reason, position) {
      this.$toast(`${reason}导致${position}操作按钮关闭`)
    },
    changeState (value) {
      this.value = value
    }
  }
}
```

### 点击事件

> `click`事件只会在关闭滑动按钮时触发。

回调函数的参数表示点击的位置，其中`left`、`right`表示点击了左右滑动按钮，`inside`表示点击了容器内部按钮以外的部分，`outside`表示点击了容器以外的地方。

```html
  <wd-swipe-action @click="handleClick">
    <wd-cell title="标题文字" value="内容"/>
    <div slot="right" class="action">
      <button class="button" style="background: #C8C7CD;">操作1</button>
      <button class="button" style="background: #FFB300;">操作2</button>
      <button class="button" style="background: #E2231A;">操作3</button>
    </div>
  </wd-swipe-action>
```
```javascript
export default {
  methods: {
    handleClick (position) {
        this.$toast(`点击${position}关闭操作按钮`)
    },
  }
}
```

### 禁用滑动按钮

> 设置`disabled`属性禁用滑动

```html
<wd-swipe-action disabled>
  <wd-cell title="标题文字" value="内容" />
  <div slot="right" class="action">
    <button class="button" style="background: #C8C7CD;">操作1</button>
    <button class="button" style="background: #FFB300;">操作2</button>
    <button class="button" style="background: #E2231A;">操作3</button>
  </div>
</wd-swipe-action>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|---------|
| v-model | 滑动按钮的状态 | string | left / close / right | close | - |
| disabled | 是否禁用滑动操作 | boolean | - | false | - |
| auto-close | 点击 swipeAction 以外的部分是否自动关闭 滑动操作 | boolean | - | true | - |
| before-close | 关闭滑动按钮前的钩子函数 | function | - | - | - |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| click | 屏幕点击事件 | 点击的位置: 'left'、'inside'、outside'、'right' | - |

### Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| left | 自定义左按钮 | - |
| default | 自定义内容 | - |
| right | 自定义右按钮 | - |
