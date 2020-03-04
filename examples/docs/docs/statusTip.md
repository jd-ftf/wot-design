## StatusTip 缺省提示

### 按需引入

```javascript
import Vue from 'vue'
import { StatusTip } from 'wot-design'

Vue.use(StatusTip)
```

### 基本用法

设置 `type` 修改展示缺省类型，默认为 'network'，可选值 'search', 'notfound', 'network', 'content', 'collect', 'comment', 'pay', 'subscribe'。可设置 `tip` 修改默认类型提示文案。

```html
<wd-status-tip type="network"/>
<wd-status-tip type="search"/>
<wd-status-tip type="notfound"/>
<wd-status-tip type="content"/>
<wd-status-tip type="collect"/>
<wd-status-tip type="comment"/>
<wd-status-tip type="pay"/>
<wd-status-tip type="subscribe"/>
```

### 自定义提示文案

设置 `tip` 修改默认类型提示文案。

```html
<wd-status-tip type="pay" tip="支付出现异常，请重试"/>
```

### 有一个操作建议或其他功能扩展

通过 `slot` 来设置操作按钮或扩展其他功能

```html
<wd-status-tip type="network">
  <div class="option-btn-box">
    <wd-button type="primary" plain size="large" @click="handleClick" >操作文案</wd-button>
  </div>
</wd-status-tip>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleClick () {
      this.$toast.success('操作成功')
    }
  }
}
</script>

<style lang="scss">
.option-btn-box {
  margin-top: 18px;
  text-align: center;
}
</style>
```


### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type | 缺省类型 | String | 'search', 'notfound', 'network', 'content', 'collect', 'comment', 'pay', 'subscribe' | 'network' |
| tip | 提示文案 | String | - | 根据类型展示默认文案 |


### Slot

| name      | 说明       |
|------------- |----------- |
| other | 扩展其他功能操作内容 |