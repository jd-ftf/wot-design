## ImagePreview 图片预览

图片预览支持使用JS直接弹出弹框，也支持组件引用的方式。

### 按需引入

```javascript
import Vue from 'vue'
import { ImagePreview } from 'wot-design'

Vue.use(ImagePreview)
```

## 代码演示

### 基础用法

直接传入图片数组，即可展示图片预览

```html
<wd-button @click="toggle">图片预览</wd-button>
<script>
export default {
  data () {
    return {
      imgList: [
        'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg',
        'https://img.yzcdn.cn/vant/apple-4.jpg'
      ]
    }
  },
  methods: {
    toggle () {
      this.$preview({
        imgList: this.imgList
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
      imgList: [
        'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg',
        'https://img.yzcdn.cn/vant/apple-4.jpg'
      ]
    }
  },
  methods: {
    toggle () {
      this.$preview({
        imgList: this.imgList,
        showIndex: false,
        swipeInitialIndex: 4,
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
    :img-list="imgList"
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
      imgList: [
        'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg',
        'https://img.yzcdn.cn/vant/apple-4.jpg'
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

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| imgList | 需要预览的图片 URL 数组 | Array | -  | [] |
| maxZoom | 手势缩放时，最大缩放比例 | Number | -  | 3 |
| minZoom | 手势缩放时，最小缩放比例 | Number | -  | 1/3 |
| showIndex | 是否显示页码 | Boolean | -  | true |
| swipeInitialIndex | 图片预览起始位置索引 | Number | -  | 0 |
| swipeDuration | 动画时长，单位为`ms` | Number | -  | 500 |
| onLongTap | 长按事件钩子 | Function | -  | - |
| onClose | 打开预览列表钩子 | Function | -  | - |
| onOpen | 关闭预览列表钩子 | Function | -  | - |

### ImgPreview 组件调用

#### Attributes

通过组件调用 `ImgPreview` 时，支持以下 Props：

| 参数 | 说明 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| v-model | 是否打开图片预览组件 | Boolean    | -   | false  |
| img-list | 需要预览的图片 URL 数组 | Array | -  | [] |
| max-zoom | 手势缩放时，最大缩放比例 | Number | -  | 3 |
| min-zoom | 手势缩放时，最小缩放比例 | Number | -  | 1/3 |
| show-index | 是否显示页码 | Boolean | -  | true |
| swipe-initial-index | 图片预览起始位置索引 | Number | -  | 0 |
| swipe-duration | 动画时长，单位为`ms` | Number | -  | 500 |
| on-long-tap | 长按事件钩子 | Function | -  | - |

### Slots

通过组件调用 `ImgPreview` 时，支持以下插槽：

| 名称 | 说明 |
|------|------|
| index | 自定义页码内容 |

### Events

通过组件调用 `ImgPreview` 时，支持以下事件：

| 方法名称      | 说明       | 参数   |
|------------- |----------- |---------  |
| open | 打开弹框时触发 | - |
| close | 关闭弹框时触发 | { index: 索引 } |
