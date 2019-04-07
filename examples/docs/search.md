## Search

搜索框

### 使用

#### 按需引入

```javascript
import Vue from 'vue'
import { Search } from 'jm-design'

Vue.use(Search)
```

#### CDN 按需引入

```html
<!-- CSS引用 -->
<link rel="stylesheet" href="//static.360buyimg.com/lib/jm-design/0.1.1/search/style/css/search.css">
<!-- JS引用 -->
<script src="//static.360buyimg.com/lib/jm-design/0.1.1/search/index.js">
```

#### 示例

```html
<!-- 搜索，监听对应事件search、cancel、clear事件 -->
<jm-search
  v-model="search1"
  @search="handleSearch"
  @cancel="handleCancel"
  @clear="handleClear"
/>

<!-- light 为 true 的搜索，监听 focus 和 blur 事件 -->
<jm-search
  v-model="search2"
  light
  @focus="handleFocus1"
  @blur="handleBlur"
/>

<!-- placeholder-left 为 true 的搜索 -->
<jm-search v-model="search3" placeholder-left />

<!-- hide-cancel 为 true ，且 disabled 为 true 的搜索，一般用于在本页显示搜索框，点击搜索时跳进搜索页 -->
<jm-search v-model="search4" @focus="handleFocus2" hide-cancel disabled />

<!-- 修改 placeholder 和 cancel-txt 的值 -->
<jm-search v-model="search5" placeholder="请输入订单号/订单名称" cancel-txt="搜索" />

<script>
export default {
  data () {
    return {
      search1: '',
      search2: '',
      search3: '',
      search4: '',
      search5: '',
      search6: ''
    }
  },
  methods: {
    handleSearch (val) {
      this.$toast(`搜索：${val}`)
    },
    handleFocus1 () {
      this.$toast('聚焦搜索框')
    },
    handleBlur () {
      this.$toast('搜索框失去焦点')
    },
    handleCancel () {
      this.$toast('点击了取消按钮')
    },
    handleClear () {
      this.$toast('点击了清除按钮')
    },
    handleFocus2 () {
      this.$toast('点击了搜索框，但不会聚焦，因为搜索框不可用')
    }
  }
}
</script>
```

### Arrtibute

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model   |	绑定值                        |	string     | -   |	-  |
| placeholder	    | 搜索框占位文本                  |	string    |	-         |	'搜索' |
| cancel-txt      | 搜索框右侧文本                   | string    | -          | '取消'   |
| light           | 搜索框亮色（白色）                | boolean   | -          | false   |
| placeholder-left | 搜索框占位文本是否靠左对齐        | boolean    | -         | false   |
| hide-cancel     | 是否隐藏右侧文本                 | boolean    | -          | false   |
| disabled        | 是否禁用搜索框                   | boolean    | -          | false   |

### Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| focus        | 监听输入框focus事件                    | -       |
| blur         | 监听输入框blur事件                     | -       |
| search       | 监听输入框搜索事件                      | 搜索输入框文本       |
| clear        | 监听输入框清空按钮事件                   | -       |
| cancel       | 监听输入框右侧文本点击事件               | -       |