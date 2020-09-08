<template>
  <div>
    <demo-block title="基本用法">
      <wd-upload v-model="fileList1" action="https://jsonplaceholder.typicode.com/posts/"></wd-upload>
    </demo-block>
    <demo-block title="展示文件名">
      <wd-upload show-name v-model="fileList2" action="https://jsonplaceholder.typicode.com/posts/"></wd-upload>
    </demo-block>
    <demo-block title="多选上传">
      <wd-upload
        v-model="fileList3"
        multiple
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        action="https://jsonplaceholder.typicode.com/posts/"
      ></wd-upload>
    </demo-block>
    <demo-block title="最大上传数限制">
      <wd-upload
        v-model="fileList4"
        :limit="3"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-exceed="handleExceed"
      ></wd-upload>
    </demo-block>
    <demo-block title="自定义预览">
      <wd-upload
        v-model="fileList5"
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-preview="handlePictureCardPreview"
      ></wd-upload>
    </demo-block>
    <demo-block title="上传前置处理">
      <wd-upload
        v-model="fileList6"
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-upload="beforeUpload"
      ></wd-upload>
    </demo-block>
    <demo-block title="移除图片前置处理">
      <wd-upload
        v-model="fileList7"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
      ></wd-upload>
    </demo-block>
    <demo-block title="上传各个状态钩子">
      <wd-upload
        v-model="fileList8"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-error="handleError"
        :on-progress="handleProgress"
        :on-success="handleSuccess"
      ></wd-upload>
    </demo-block>
    <demo-block title="禁用">
      <wd-upload v-model="fileList9" disabled action="https://jsonplaceholder.typicode.com/posts/"></wd-upload>
    </demo-block>
    <demo-block title="自定义唤起上传样式">
      <wd-upload
        v-model="fileList10"
        action="https://jsonplaceholder.typicode.com/posts/"
        reverse
        custom-envoke-class="test-class"
      >
        <wd-button>上传</wd-button>
      </wd-upload>
    </demo-block>
    <wd-message-box :show="isShow" @action="handleAction" title="图片预览">
      <img width="100%" :src="previewImgUrl" />
    </wd-message-box>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      previewImgUrl: '',
      fileList1: [],
      fileList2: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
      }],
      fileList3: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
      }, {
        name: '图片名称',
        url: 'https://img13.360buyimg.com//n0/jfs/t1/116155/19/7759/93443/5ec76a1dE8cc1832d/6a66c4c2eb501df2.jpg'
      }],
      fileList4: [{
        name: '图片名称',
        url: 'https://img13.360buyimg.com//n0/jfs/t1/116155/19/7759/93443/5ec76a1dE8cc1832d/6a66c4c2eb501df2.jpg'
      }],
      fileList5: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
      }],
      fileList6: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
      }],
      fileList7: [],
      fileList8: [],
      fileList9: [],
      fileList10: []
    }
  },

  methods: {
    beforeUpload (file, resolve) {
      this.$messageBox.confirm('是否上传', '提示').then(() => {
        resolve(true)
      }).catch(() => {
        resolve(false)
      })
    },
    beforeRemove (file, resolve) {
      this.$messageBox.confirm('是否删除', '提示').then(() => {
        resolve(true)
      }).catch(() => {
        resolve(false)
      })
    },
    handleRemove (file, fileList) {
      console.log(this.fileList3)
      this.$toast.success('删除成功')
    },
    handleProgress (e, file) {
      console.log('正在上传....', file)
    },
    handleSuccess (res, file, fileList) {
      console.log(this.fileList3)
      this.$toast.success(`图片[${file.name}]上传成功`)
    },
    handleError (res, file, fileList) {
      this.$toast.error('上传失败')
    },
    handleExceed (files, fileList) {
      this.$toast.warning('超出最大个数限制')
    },
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
<style scope>
.test-class {
  flex-basis: 100%;
  display: block;
  margin-bottom: 12px;
}
</style>
