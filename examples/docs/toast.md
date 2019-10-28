## Toast 轻提示

### 按需引入

```javascript
import Vue from 'vue'
import { Toast } from 'jm-design'

Vue.use(Toast)
```

### 基本用法

基本用法。

```javascript
// 纯文字提示
this.$toast('提示信息')
```

### 成功、异常、警告

```javascript
this.$toast.success('操作成功')
this.$toast.error('手机验证码输入错误，请重新输入')
this.$toast.warning('提示信息')
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

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|options    |	配置项，可以直接传入字符串作为提示信息     |	string / object   |	—           |	—       |

### options
| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
|msg        |	消息内容                             |	string   |	—           |	—       |
|duration	  | 持续时间，单位 ms                     |	Number   |	—           |	2000 |
|iconName   |	图标类型，选择 'success' 则 duration 自动设置为 1500 ms  |	string    |	'success', 'error', 'warning' |	—      |
|iconClass  |	图标类目，自定义图标，可以使用 Icon 章节的那些图标类名，iconName 优先级更高  |	string   |	—	            | —   |
|position   |	提示信息框的位置                      |	string   |	'top', 'middle', 'bottom'  |	'default'  |
|single   	| 是否使用单例模式显示消息提示框          |	boolean   |	—            |	false     |

### Methods
| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
|close         |手动关闭消息提示框，是Toast实例上的方法| —  |
