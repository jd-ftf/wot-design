## ImgPreview 图片预览

图片预览支持使用JS直接弹出弹框，也支持组件引用的方式。

### 按需引入

```javascript
import Vue from 'vue'
import { ImgPreview } from 'wot-design'

Vue.use(ImgPreview[, options])
```

options 为一个对象，不传入则使用默认配置，其参数为：

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| previewKey | ImgPreview 预览组件在 `Vue.prototype` 原型上的属性名 | string | - | $preview | 2.3.0 |

## 代码演示

### 基础用法

直接传入图片数组，即可展示图片预览

```html
<wd-button @click="toggle">图片预览</wd-button>
<script>
export default {
  data () {
    return {
      urls: [
        'https://img11.360buyimg.com/ling/jfs/t1/113690/16/12975/651172/5f17a317E282b9f76/30bc80373c4e91fb.png',
        'https://img14.360buyimg.com/ling/jfs/t1/113879/15/16995/77352/5f50abd5E9fb3880f/89cb46fbce8b88d5.jpg'
      ]
    }
  },
  methods: {
    toggle () {
      this.$preview({
        urls: this.urls
      })
    }
  }
}
</script>
```

### 传入配置项

通过传入配置对象，可以指定初始图片的位置、是否展示索引、监听开启，关闭事件等

```html
<wd-button @click="toggle">图片预览</wd-button>
<script>
export default {
  data () {
    return {
      urls: [
        'https://img11.360buyimg.com/ling/jfs/t1/113690/16/12975/651172/5f17a317E282b9f76/30bc80373c4e91fb.png',
        'https://img14.360buyimg.com/ling/jfs/t1/113879/15/16995/77352/5f50abd5E9fb3880f/89cb46fbce8b88d5.jpg'
      ]
    }
  },
  methods: {
    toggle () {
      this.$preview({
        urls: this.urls,
        showIndex: false,
        current: 4,
        onClose: () => {
          console.log('调用方法，关闭预览')
        },
        onOpen: () => {
          console.log('调用方法，开启预览')
        },
        onLongTap: () => {
          console.log('长按事件')
        }
      })
    }
  }
}
</script>
```

### 组件调用

如果需要在图片预览内嵌入组件或其他自定义内容，可以使用组件调用的方式，调用前需要通过 `Vue.use` 注册组件

```html
<wd-button @click="openImgPreview">调用</wd-button>
  <wd-img-preview
    v-model="show"
    :urls="urls"
    @open="open"
    @close="close"
    :on-long-tap="handleLongtap"
></wd-img-preview>
```

```js
export default {
  data() {
    return {
      show: false,
      urls: [
        'https://img11.360buyimg.com/ling/jfs/t1/113690/16/12975/651172/5f17a317E282b9f76/30bc80373c4e91fb.png',
        'https://img14.360buyimg.com/ling/jfs/t1/113879/15/16995/77352/5f50abd5E9fb3880f/89cb46fbce8b88d5.jpg'
      ]
    };
  },

  methods: {
    handleLongtap () {
      console.log('长按事件')
    },
    close ({ index }) {
      console.log('关闭', index)
    },
    open () {
      console.log('打开')
    },
    openImgPreview () {
      this.show = true
    }
  }
}
```

### ImgPreview JS 调用

#### Options Attributes

通过函数调用 `ImgPreview` 时，支持传入以下选项：

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| urls | 需要预览的图片 URL 数组 | array | -  | [] | - |
| maxZoom | 手势缩放时，最大缩放比例 | number | -  | 3 | - |
| minZoom | 手势缩放时，最小缩放比例 | number | -  | 1/3 | - |
| showIndex | 是否显示页码 | boolean | -  | true | - |
| current | 图片预览起始位置索引 | number | -  | 0 | - |
| swipeDuration | 动画时长，单位为`ms` | number | -  | 500 | - |
| onLongTap | 长按事件钩子 | function | -  | - | - |
| onClose | 打开预览列表钩子 | function | -  | - | - |
| onOpen | 关闭预览列表钩子 | function | -  | - | - |

### ImgPreview 组件调用

#### Attributes

通过组件调用 `ImgPreview` 时，支持以下 Props：

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|---------|
| v-model | 是否打开图片预览组件 | boolean | - | false | - |
| urls | 需要预览的图片 URL 数组 | array | -  | [] | - |
| max-zoom | 手势缩放时，最大缩放比例 | number | -  | 3 | - |
| min-zoom | 手势缩放时，最小缩放比例 | number | -  | 1/3 | - |
| show-index | 是否显示页码 | boolean | -  | true | - |
| current | 图片预览起始位置索引 | number | -  | 0 | - |
| swipe-duration | 动画时长，单位为`ms` | number | -  | 500 | - |

### Slots

通过组件调用 `ImgPreview` 时，支持以下插槽：

| 名称 | 说明 | 最低版本 |
|-----|------|--------|
| index | 自定义页码内容 | - |

### Events

通过组件调用 `ImgPreview` 时，支持以下事件：

| 方法名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| open | 打开弹框时触发 | { index: 索引 } | - |
| close | 关闭弹框时触发 | { index: 索引 } | - |
| long-tap | 长按图片事件 | { index: 索引 } | - |
