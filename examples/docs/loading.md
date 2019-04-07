## Loading

加载，支持单独使用加载指示器和js直接打开loading框

### 使用

#### 按需引入

```javascript
import Vue from 'vue'
import { Loading } from 'jm-design'

Vue.use(Loading)
```

#### CDN 按需引入

```html
<!-- CSS引用 -->
<link rel="stylesheet" href="//static.360buyimg.com/lib/jm-design/0.1.1/loading/style/css/loading.css">
<!-- JS引用 -->
<script src="//static.360buyimg.com/lib/jm-design/0.1.1/loading/index.js">
```

#### 示例

```html
<!-- circle 类型的加载指示器 -->
<jm-loading />

<!-- circle 类型，白色的加载指示器 -->
<jm-loading color="#fff" class="loading-black" />

<!-- spinner 类型的加载指示器 -->
<jm-loading type="spinner" />

<!-- spinner 类型，白色的加载指示器 -->
<jm-loading type="spinner" color="#fff" class="loading-black" />

<!-- 设置 size 大小 -->
<jm-loading size="20px" />
<jm-loading size="30px" />
<jm-loading size="50px" />

<!-- 手动打开 loading 加载框 -->
<jm-button @click="openLoading">打开loading弹窗</jm-button>
<jm-button @click="openSpinnerloading">打开Spinner类型的loading弹窗</jm-button>

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

#### Arrtibute

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