## ImgCropper 图片裁剪

- 支持拖拽，用于移动图片使其位于对应位置
- 支持缩放，用于截取限定区域
- 支持旋转，用于截取对应角度
- 支持图片裁剪

### 按需引入

```javascript
import Vue from 'vue'
import { ImgCropper } from 'wot-design'

Vue.use(ImgCropper)
```

### 基本用法

图片裁剪组件需要绑定 `v-model` 来控制组件的显示与隐藏，通过属性 `img-src` 控制展示的图片资源位，也可以通过函数 `resetImg` 来控制组件图片的初始化。进入组件后，可以对图片进行拖拽、双指缩放、旋转等操作。监听 `confirm` 事件获取选中值。

> *注意：在使用组件时，最好在一个新页面中使用图片裁剪组件，图片裁剪保持`show`为true，完成裁剪时，返回上一页。*

```html
<template>
  <div>
    <wd-img-cropper
      id="wd-img-cropper"
      v-model="show"
      :img-src="imgSrc"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      >
    </wd-img-cropper>

    <div class="profile">
      <div v-if="!loadSrc" class="img" @click="upload">
        <i class="wd-icon-fill-camera img-icon"></i>
      </div>
      <wd-img
        v-else
        round
        width="200px"
        height="200px"
        :src="loadSrc"
        class="profile-img"
      />
    </div>
    <wd-upload
      ref="upload"
      v-model="fileList"
      :show-preview-list="false"
      :before-upload="beforeUpload"
      @success="handleSuccess"
      action="https://ftf.jd.com/api/uploadImg"
      >
      <wd-button>上传</wd-button>
    </wd-upload>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fileList: [],
      loadSrc: '',
      show: false,
      imgSrc: '',
      resolve: null
    }
  },
  methods: {
    upload () {
      const target = this.$refs.upload
      target.$refs.input.click()
    },

    beforeUpload ({ files, resolve }) {
      this.loadFile(files[0], () => {
        // 裁剪成功
        this.resolve = resolve
      })
    },

    /**
     * @description 上传的文件
     * @param {Object} file 上传的文件
     */
    loadFile (file, callback) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        let image = new Image()
        image.onload = (e) => {
          callback && callback(e)
        }
        image.src = data
        this.imgSrc = data
        this.show = true
      }
      reader.readAsDataURL(file)
    },

    handleSuccess (file) {
      this.$toast.success('上传成功')
    },

    handleConfirm (res) {
      this.$toast.loading('上传中')
      this.resolve(true)
      this.loadSrc = res.url
    },

    handleCancel () {
      console.log('取消')
    },
  },
}
</script>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |  是否必填 | 最低版本 |
|---------- |------------------------------------ |---------- |------------- |-------- |-------- |-------- |
| v-model | 打开图片裁剪组件 | Boolean | - | false | 是 |2.3.0|
| img-src | 图片资源链接 | String | - | - | 否 |2.3.0|
| img-width | 截屏预览图片的初始宽度，默认单位为px；`1、设置宽度不设置高度，按照宽度等比缩放；2、如果都不设置，预览时图片大小会根据裁剪框大小进行等比缩放，进行锁边处理；` | Number / String | - | - | 否 |2.3.0|
| img-height | 截屏预览图片的初始高度，默认单位为px；`1、设置高度不设置宽度，按照高度等比缩放；2、如果都不设置，预览时图片大小会根据裁剪框大小进行等比缩放，进行锁边处理；` | Number / String | - | - | 否 |2.3.0|
| disabled-rotate | 禁止图片旋转 | Boolean | - | false | 否 |2.3.0|
| export-scale | 设置导出图片尺寸 | Number | - | 2 | 否 |2.3.0|
| max-scale | 最大缩放倍数 | Number | - | 3 | 否 |2.3.0|
| cancel-button-text | 取消按钮文案 | string | - | 取消 | 否 |2.3.0|
| confirm-button-text | 确认按钮文案 | string | - | 完成 | 否 |2.3.0|
| quality | 生成的图片质量 | Number | 0/1 | 1 | 否 |2.3.0|
| fileType | 目标文件的类型 | string | - | 'image/png'| 否  |2.3.0|

### Events

| 事件名称      | 说明                                 | 参数     | 最低版本 |
|------------- |------------------------------------ |--------- |-------- |
| bind:confirm | 完成截图时触发 | {url, width, height} 分别为生成地址、生成图片宽、生成图片高|2.3.0|
| bind:cancel | 当取消截图时触发 | - |2.3.0|

### Methods

对外暴露函数

| 事件名称      | 说明                                 | 参数     | 最低版本 |
|------------- |------------------------------------ |--------- |-------- |
| setRoate | 设置图片旋转角度 | deg (设置的旋转角度)|2.3.0|
| resetImg | 重置图片的角度、缩放、位置 | - |2.3.0|
