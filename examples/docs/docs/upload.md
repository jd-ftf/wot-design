## Upload 上传

图片上传组件

### 按需引入

```javascript
import Vue from 'vue'
import { Upload } from 'wot-design'

Vue.use(Upload)
```

### 基本用法

`v-model` 设置上传列表，数据类型为数组；

`action` 设置图片上传的地址；

```html
<wd-upload
  v-model="fileList"
  action="https://jsonplaceholder.typicode.com/posts/"
></wd-upload>

<script>
export default {
  data () {
    return {
      fileList: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
      }]
    }
  }
}
</script>
```

### 禁用

设置 `disabled` 开启禁用上传

```html
<wd-upload
  v-model="fileList"
  action="https://jsonplaceholder.typicode.com/posts/"
  disabled>
</wd-upload>
```

### 展示文件名

通过设置 `show-name` 开启展示文件名。

```html
<wd-upload
  v-model="fileList"
  show-name
  action="https://jsonplaceholder.typicode.com/posts/"
></wd-upload>
```

### 多选上传

通过设置 `multiple` 开启文件多选上传。

```html
<wd-upload
  v-model="fileList"
  multiple
  action="https://jsonplaceholder.typicode.com/posts/"
></wd-upload>
```

### 最大上传数限制

上传组件可通过设置 `limit` 和 `on-exceed` 来限制上传文件的个数和定义超出限制时的行为。

传入 `on-exceed` 属性，其类型为 `function`，接收参数 files: Object；fileList: Array；

```html
<wd-upload
  v-model="fileList"
  :limit="3"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-exceed="handleExceed"
></wd-upload>

<script>
export default {
  methods: {
    handleExceed (files, fileList) {
      this.$toast.warning('超出最大个数限制')
    }
  }
}
</script>
```

### 自定义预览

设置 `before-preview` 函数，在用户点击图片进行预览时，会执行 `before-preview` 函数，并传入 `file` 和 `resolve` 参数，可以对 `file` 进行处理，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会执行预览图片操作。

```html
<wd-upload
  v-model="fileList"
  action="https://jsonplaceholder.typicode.com/posts/"
  :before-preview="handlePictureCardPreview"
></wd-upload>
<wd-message-box :show="isShow" @action="handleAction" title="图片预览">
  <img width="100%" :src="previewImgUrl" />
</wd-message-box>

<script>
export default {
  data () {
    return {
      isShow: false,
      previewImgUrl: '',
      fileList: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
      }]
    }
  },
  methods: {
    handlePictureCardPreview (file, resolve) {
      this.isShow = true
      this.previewImgUrl = file.url
      resolve(false)
    },
    handleAction (action) {
      this.isShow = false
    }
  }
}
</script>
```

### 上传前置处理

设置 `before-upload` 函数，弹出图片选择界面，在用户选择图片点击确认后，会执行 `before-upload` 函数，并传入 `file` 和 `resolve` 参数，可以对 `file` 进行处理，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会执行上传操作。

```html
<wd-upload
  v-model="fileList"
  action="https://jsonplaceholder.typicode.com/posts/"
  :before-upload="beforeUpload"
></wd-upload>

<script>
export default {
  data () {
    return {
      fileList: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
      }]
    }
  },
  methods: {
    beforeUpload (file, resolve) {
      this.$messageBox.confirm('是否上传', '提示').then(() => {
        resolve(true)
      }).catch(() => {
        resolve(false)
      })
    }
  }
}
</script>
```

### 移除图片前置处理

设置 `before-remove` 函数，在用户点击关闭按钮时，会执行 `before-remove` 函数，并传入 `file` 和 `resolve` 参数，可以对 `file` 进行处理，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会执行移除图片操作。

传入 `on-remove` 属性，在图片移除后触发，其类型为 `function`，接收参数 file: object；fileList: Array；

```html
<wd-upload
  v-model="fileList"
  action="https://jsonplaceholder.typicode.com/posts/"
  @remove="handleRemove"
  :before-remove="beforeRemove">
</wd-upload>

<script>
export default {
  data () {
    return {
      fileList: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
      }]
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.$toast.success('删除成功')
    },
    beforeRemove (file, resolve) {
      this.$messageBox.confirm('是否删除', '提示').then(() => {
        resolve(true)
      }).catch(() => {
        resolve(false)
      })
    }
  }
}
</script>
```

### 上传各个状态

事件 `fail`，在上传失败时触发，类型为 `Function`，接收参数 error: object；file: object；fileList: Array；

事件 `progress`，在上传时触发，类型为 `Function`，接收参数 event: object；file: object；

事件 `success`，在上传成功时触发，类型为 `Function`，接收参数 response: object；file: object；fileList: Array；

```html
<wd-upload
  v-model="fileList"
  action="https://jsonplaceholder.typicode.com/posts/"
  @fail="handleError"
  @progress="handleProgress"
  @success="handleSuccess">
</wd-upload>

<script>
export default {
  data () {
    return {
      fileList: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
      }]
    }
  },
  methods: {
    handleProgress (event, file) {
      console.log('正在上传....', file)
    },
    handleSuccess (response, file, fileList) {
      console.log(file)
      this.$toast.success(`图片[${file.name}]上传成功`)
    },
    handleError (error, file, fileList) {
      this.$toast.error('上传失败')
    }
  }
}
</script>
```

### 自定义唤起上传样式

使用默认插槽可以修改唤起上传的样式。

在自定义唤起项时，可以使用 `custom-evoke-class` 属性添加自定义class。

上传组件默认图片列表在唤起项前，可通过设置 `reverse` 属性将位置颠倒。

```html
<wd-upload
  v-model="fileList"
  action="https://jsonplaceholder.typicode.com/posts/"
  reverse
  custom-evoke-class="test-class">
  <wd-button>上传</wd-button>
</wd-upload>

<script>
export default {
  data () {
    return {
      fileList: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
      }]
    }
  }
}
</script>
<style>
.test-class {
  flex-basis: 100%;
  display: block;
  margin-bottom: 12px;
}
</style>
```

通过 max-size 属性可以限制上传文件的大小，超过大小的文件会被自动过滤，这些文件信息可以通过 oversize 事件获取

### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| file-list | 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] | array | — | [] |
| action | 必选参数，上传的地址 | string | — | - |
| name | 上传的文件字段名 | string | - | 'file' |
| data | 上传时附带的额外参数 | object | - | - |
| headers | 设置上传的请求头部 | object | — | — |
| multiple | 是否支持多选文件 | boolean | — | — |
| with-credentials | 支持发送 cookie 凭证信息 | boolean | — | false |
| accept | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效）| string | — | 'image/*' |
| disabled | 是否禁用 | boolean | — | false |
| custom-evoke-class | 自定义唤起项class | string | — | - |
| reverse | 反转预览列表和唤起项位置，默认唤起项在图片列表后 | boolean | — | false |
| show-name | 是否展示文件名 | boolean | — | false |
| limit | 最大允许上传个数 |  number | — | — |
| show-limit-num | 限制上传个数的情况下，是否展示当前上传的个数 | boolean | — | false |
| max-size | 文件大小限制，单位为`byte` |  number | — | — |
| on-exceed | 文件超出个数限制时的钩子 | function(files, fileList) | — | - |
| before-upload | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。 | function(file) | — | — |
| before-remove | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。| function(file, fileList) | — | — |
| before-preview | 图片预览前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。| function(file, fileList) | — | — |
| loading-type | [加载中图标类型](/docs#/components/loading) | string | — | 'circular-ring' |
| loading-color | [加载中图标颜色](/docs#/components/loading) | string | — | '#ffffff' |
| loading-size | [加载中图标尺寸](/docs#/components/loading) | string | — | '24px' |
| show-img-preview | 是否开启图片预览，上传组件中使用了[图片预览组件 JS 调用](/docs#/components/imgPreview)的方式 | boolean | — | false |
| max-zoom | 开启图片预览，手势缩放时，最大缩放比例，详细使用说明查看[图片预览组件 JS 调用](/docs#/components/imgPreview) | Number | -  | 3 |
| min-zoom | 开启图片预览，手势缩放时，最小缩放比例，详细使用说明查看[图片预览组件 JS 调用](/docs#/components/imgPreview) | Number | -  | 1/3 |
| show-index | 开启图片预览，是否显示页码，详细使用说明查看[图片预览组件 JS 调用](/docs#/components/imgPreview) | Boolean | -  | true |
| swipe-duration |开启图片预览， 动画时长，单位为`ms`，详细使用说明查看[图片预览组件 JS 调用](/docs#/components/imgPreview) | Number | -  | 500 |
| on-long-tap | 开启图片预览，长按事件钩子，详细使用说明查看[图片预览组件 JS 调用](/docs#/components/imgPreview) | Function | -  | - |
| on-close | 开启图片预览，打开预览列表钩子，详细使用说明查看[图片预览组件 JS 调用](/docs#/components/imgPreview) | Function | -  | - |
| on-open | 开启图片预览，关闭预览列表钩子，详细使用说明查看[图片预览组件 JS 调用](/docs#/components/imgPreview) | Function | -  | - |
| name-key | file 数据结构中，name 对应的 key | string | - | 'name' |
| status-key | file 数据结构中，status 对应的 key | string | - | 'status' |

### file 数据结构

| 键名 | 类型 | 说明 |
|---------- |---- |---------- |
| uid | number | 当前上传文件在列表中的唯一表示 |
| name | string | 上传图片名 |
| url | string | 上传图片地址 |
| action | string | 上传的地址 |
| file | object | 上传图片的详细信息 |
| percent | number | 上传进度 |
| size | number | 响文件尺寸应码 |
| status | string | 当前图片上传状态 |

### Slot

| name      | 说明       |
|------------- |----------- |
| default | 上传唤起插槽样式 |

### Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| oversize | 文件大小超过限制时触发 | file: 尺寸超出的文件信息 |
| remove | 文件列表移除文件时触发 | file: 尺寸超出的文件信息，fileList: 文件列表 |
| success | 文件上传成功时触发 | response: 响应信息，file: 尺寸超出的文件信息，fileList: 文件列表 |
| fail | 文件上传失败时触发 | err: 错误信息，file: 尺寸超出的文件信息，fileList: 文件列表 |
| progress | 文件上传时触发 | event: 上传中事件信息，file: 尺寸超出的文件信息，fileList: 文件列表 |
