## Search 搜索框

### 按需引入

```javascript
import Vue from 'vue'
import { Search } from 'wot-design'

Vue.use(Search)
```

### 基本用法

`v-model` 设置输入框绑定值，`search` 绑定搜索事件，`cancel` 绑定取消事件，`clear` 绑定清空事件。

```html
<wd-search v-model="search" @search="handleSearch" @cancel="handleCancel" @clear="handleClear"></wd-search>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    handleSearch (val) {
      this.$toast(`搜索：${val}`)
    },
    handleCancel () {
      this.$toast('点击了取消按钮')
    },
    handleClear () {
      this.$toast('点击了清除按钮')
    }
  }
}
</script>
```

### 浅色主题

设置 `light` 属性，将组件背景色和输入框背景色反转。

```html
<wd-search v-model="search" light></wd-search>
```

### 输入框提示文案靠左

设置 `placeholder-left` 属性。

```html
<wd-search v-model="search" placeholder-left></wd-search>
```

### 隐藏取消按钮

设置 `hide-cancel` 属性。

```html
<wd-search v-model="search" hide-cancel></wd-search>
```

### 禁用

设置 `disabled` 属性。

```html
<wd-search v-model="search" disabled></wd-search>
```

可以和 `hide-cancel` 结合使用，用于在本页只展示搜索框，当点击搜索框时，将页面路由切换进搜索页，在搜索页中再使用搜索功能。

```html
<wd-search v-model="search" hide-cancel disabled></wd-search>
```

### 自定义左侧插槽

通过使用 `prefix` 插槽自定义搜索框左侧内容。

```html
<wd-search v-model="search">
  <wd-popover slot="prefix" mode="menu" :content="menu" @menu-click="changeSearchType">
    <div class="search-type">
      <span>{{ searchType }}</span>
      <wd-icon class="icon-arrow" name="fill-arrow-down"></wd-icon>
    </div>
  </wd-popover>
</wd-search>

<script>
export default {
  data () {
    return {
      search: '',
      searchType: '全部'
    }
  },
  methods: {
    changeSearchType (item, index) {
      this.searchType = item.content
    }
  }
}
</script>

<style lang="css">
.search-type {
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 8px 0 16px;
}
.search-type::after {
  position: absolute;
  content: '';
  width: 1px;
  right: 0;
  top: 5px;
  bottom: 5px;
  background: rgba(0, 0, 0, 0.25);
}
.search-type span {
  display: inline-block;
  vertical-align: middle;
}
.search-type .icon-arrow {
  display: inline-block;
  font-size: 20px;
  vertical-align: middle;
}
}
</style>
```

### 自定义右侧文案

通过设置 `placeholder` 修改输入框提示文案，`cancel-txt` 修改取消按钮文案。

```html
<wd-search v-model="search" placeholder="请输入订单号/订单名称" cancel-txt="搜索"></wd-search>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   | 版本号 |
|---------- |------------------------------------ |---------- |------------- |-------- |-----|
| value/v-model   |	绑定值                        |	string     | -   |	-  | - |
| type | 输入类型 | string | 'number' | 'string' | 2.3.0 |
| placeholder	    | 搜索框占位文本                  |	string    |	-         |	'搜索' | - |
| cancel-txt      | 搜索框右侧文本                   | string    | -          | '取消'   | - |
| light           | 搜索框亮色（白色）                | boolean   | -          | false   | - |
| placeholder-left | 搜索框占位文本是否靠左对齐        | boolean    | -         | false   | - |
| hide-cancel     | 是否隐藏右侧文本                 | boolean    | -          | false   | - |
| disabled        | 是否禁用搜索框                   | boolean    | -          | false   | - |
| maxlength | 原生属性，设置最大长度 | string | - | - | - |
| autofocus | 原生属性，是否自动聚焦，如果在页面加载时让其获得焦点，对于 android 有效， iOS 无效 | boolean | - | - | - |

### Events

| 事件名称      | 说明                                 | 参数     | 版本号 |
|------------- |------------------------------------ |--------- |------|
| focus        | 监听输入框focus事件                    | -       | - |
| blur         | 监听输入框blur事件                     | -       | - |
| search       | 监听输入框搜索事件                      | 搜索输入框文本       | - |
| clear        | 监听输入框清空按钮事件                   | -       | - |
| cancel       | 监听输入框右侧文本点击事件               | -       | - |

### Slots

| name      | 说明       | 版本号 |
|------------- |----------- |---|
| prefix | 左侧插槽 | - |
| suffix | 右侧插槽 | - |
