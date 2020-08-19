## Pagination 分页

### 按需引入

```javascript
import Vue from 'vue'
import { Pagination } from 'wot-design'
Vue.use(Pagination)
```

### 基本用法

`v-model` 为绑定值，为 string / number 类型，total设置总条数，page-size设置一页展示条数，默认为10条，总页数通过total和page-size自动计算。

```html
<wd-pagination
  v-model="currentPage" 
  :total="total"
>
</wd-pagination>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      total: 190
    }
  }
}
</script>
```

### Icon图标

设置 `show-icon` 属性，将分页导航展示为Icon图标

```html
<wd-pagination
  v-model="currentPage" 
  :total="total"
  show-icon
>
</wd-pagination>
```

### 文字提示

设置 `show-message` 展示文字提示。

```html
<wd-pagination
  v-model="currentPage" 
  :total="total" 
  :page-size="pageSize"
  show-icon
  show-message
>
</wd-pagination>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      total: 160,
      pageSize: 20
    }
  }
}
</script>
```

### Pagination Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| value/v-model | 当前页码 |   number | - | - |
| prev-text | 上一页按钮文字 |  string | - | '上一页' |
| next-text | 下一页按钮文字 |  string | - | '下一页' |
| total-page | 总页数，如果有total，则优先使用total计算页数 |  number | - | 根据页数计算 |
| page-size | 分页大小 |  number | - | 10 |
| total | 总数据个数 |  number | - | 1 |
| show-icon | 是否展示分页Icon |  boolean | - | false |
| show-message | 是否展示文字提示 |  boolean | - | false |
| hide-if-one-page | 总页数只有一页时是否隐藏 |  boolean | - | true |




### Pagination Events

| 事件名称      | 说明                                 | 参数     |
|------------- |------------------------------------ |--------- |
| change | 页码改变时触发 | - |