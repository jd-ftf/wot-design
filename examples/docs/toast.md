## Toast 轻提示

消息提示框，支持同时存在多个消息提示框或一个消息提示框，可以设置持续时间，位置和图标，支持手动关闭

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

// 带成功Icon的提示
this.$toast({
  iconName: 'success',
  msg: '操作成功'
})

// 带错误Icon的提示
this.$toast({
  iconName: 'error',
  msg: '手机验证码输入错误，请重新输入'
})

// 带警告Icon的提示
this.$toast({
  iconName: 'warning',
  msg: '提示信息'
})

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

#### 调用方式

Toast 一般在 JS 中调用比直接在页面中引入实例要方便，在 Vue 中为了方便调用，我们将 Toast 挂载在 Vue 的原型上，通过 
`this.$toast(options)` 进行调用。

#### 单例模式

有时候，我们不想要一次性弹出多个弹窗，我们可以使用单例模式，让页面只能同时出现一个弹窗，将 single 设置为 true，同时不要在这个页面上出现 single 非 true 的弹窗实例。

```javascript
this.$toast({
  single: true,
  msg: '提示信息'
})
```

#### 手动关闭 Toast

如果你使用的是单页面路由，在toast没关闭之前跳转页面，那toast是会依旧存在的，因为toast不是挂载在路由切换的dom节点上，而是挂载在body上的。

Toast实例具有close()方法，可以手动关闭弹窗，不过你需要用一个变量保存调用toast返回的实例。

```javascript
export default {
  data() {
    return {
      toastObj: ''
    }
  },
  methods: {
    showToast() {
      this.toastObj = this.$toast({
        iconName: 'warning',
        msg: '提示信息'
      })
    },
    closeToast() {
      this.toastObj.close()
    }
  }
}
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
