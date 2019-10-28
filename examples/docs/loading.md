## Loading 加载指示器

加载，支持单独使用加载指示器和js直接打开loading框

### 按需引入

```javascript
import Vue from 'vue'
import { Loading } from 'jm-design'

Vue.use(Loading)
```

### 基本用法

默认为 `circle` 类型的加载指示器。

```html
<jm-loading />
```

### 修改颜色

通过 `color` 属性修改指示器的颜色。比如修改为白色，同时设置背景为黑色。

```html
<jm-loading color="#fff" class="loading-black" />
```

```css
.loading-black {
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 4px;
}
```

### 修改指示器类型

通过 `type` 修改指示器的类型，可选值为 'spinner' 和 'circle'，默认为 'circle'。

```html
<jm-loading type="spinner" />
```

### 修改指示器大小

通过 `size` 属性设置指示器的大小，默认为 '32px' 大小。

```html
<jm-loading size="20px" />
<jm-loading size="30px" />
<jm-loading size="50px" />
```

### JS 打开 loading 弹窗

该组件会在 Vue 上挂载 `$loading` 对象，通过该对象我们可以手动打开和关闭弹窗。

```html
<jm-button type="primary" plain @click="openLoading">打开loading弹窗</jm-button>
<jm-button type="primary" plain @click="openSpinnerloading">打开Spinner类型的loading弹窗</jm-button>

<script>
export default {
  methods: {
    openLoading () {
      this.$loading.open('3s后调用close关闭')
      setTimeout(() => {
        this.$loading.close()
      }, 3000)
    },
    openSpinnerloading () {
      this.$loading.open({
        msg: '3s后调用close关闭',
        type: 'spinner'
      })
      setTimeout(() => {
        this.$loading.close()
      }, 3000)
    }
  }
}
</script>
```

### Loading 加载指示器

#### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type      |	加载指示器类型                        |	string    |	'spinner'   |	'circle'  |
| color	    | 设置加载指示器颜色                      |	string    |	-         |	'#c5c5c5' |
| size      | 设置加载指示器大小                      | string    | -          | '32px'   |

### Loading 加载框

Loading加载框只会同时存在一个

#### Methods

| 方法名     | 说明                                 | 参数     |
|---------- |------------------------------------ |--------- |
| open      | 打开加载提示框                         | options |
| close     | 关闭加载提示框                         | -       |

#### Options

options可以为Object也可以为String

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type      |	加载指示器类型                        |	string    |	'spinner'   |	'circle'  |
| msg	      | 加载提示                             |	string    |	-         |	- |