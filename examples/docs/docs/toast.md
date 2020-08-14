## Toast 轻提示

### 按需引入

```javascript
import Vue from 'vue'
import { Toast } from 'wot-design'

Vue.use(Toast)
```

### 基本用法

基本用法。

```javascript
// 纯文字提示
this.$toast('提示信息')
```

### 成功、异常、警告、常规

```javascript
this.$toast.success('操作成功')
this.$toast.error('手机验证码输入错误，请重新输入')
this.$toast.warning('提示信息')
this.$toast.info('常规提示信息')
```

### 提示位置

```javascript
// 顶部提示
this.$toast({
  position: 'top',
  msg: '提示信息'
})

// 底部提示
this.$toast({
  position: 'bottom',
  msg: '提示信息'
})
```

### 关闭提示

```javascript
this.$toast.close()
```

### loading 提示

```javascript
this.$toast.loading('加载中...')
```

修改 loading 指示器类型：

```javascript
this.$toast.loading({
  loadingType: 'spinner',
  msg: '加载中...'
})
```

手动关闭 loading：

```javascript
this.$toast.close()
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| options    | 配置项，可以直接传入字符串作为提示信息     | string / object   | —           | —       |

### options

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| msg        | 消息内容                             | string   | — | — |
| duration | 持续时间，单位 ms，为 0 时表示不自动关闭 | Number | — | 2000 |
| iconName | Toast 可使用图标类型 | string | 'success', 'error', 'warning', 'info' | — |
| iconSize | 左侧图标尺寸 | string | - | '42px' |
| iconClass  | 图标类目，自定义图标，可以使用 Icon 章节的那些图标类名，iconName 优先级更高  | string   | —             | —   |
| position   | 提示信息框的位置                      | string   | 'top', 'middle', 'bottom'  | 'default'  |
| loadingType | 加载指示器类型 | string | 'circle-outline', 'spinner','circle' | 'circle-outline' |
| loadingColor | 加载icon的颜色 | string | '' | '#4D80F0' |

### Methods

| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| success | 成功提示 | options |
| error | 关闭提示 | options |
| info | 常规提示 | options |
| warning | 警告提示 | options |
| loading | 加载提示 | options |
| close | 手动关闭消息提示框，是Toast实例上的方法| —  |
