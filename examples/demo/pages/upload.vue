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
    <demo-block title="拦截预览图片操作">
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
        @remove="handleRemove"
        :before-remove="beforeRemove"
      ></wd-upload>
    </demo-block>
    <demo-block title="上传各个状态">
      <wd-upload
        v-model="fileList8"
        action="https://jsonplaceholder.typicode.com/posts/"
        @fail="handleError"
        @progress="handleProgress"
        @success="handleSuccess"
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
        custom-evoke-class="test-class"
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
        url: 'https://img12.360buyimg.com/ling/jfs/t1/113331/7/16867/48717/5f50b97eE1e7730a8/32880e735dd48ae3.jpg'
      }],
      fileList3: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com/ling/jfs/t1/113331/7/16867/48717/5f50b97eE1e7730a8/32880e735dd48ae3.jpg'
      }, {
        name: '图片名称',
        url: 'https://img13.360buyimg.com/ling/jfs/t1/140106/11/5789/68021/5f3a3500E93dae718/3e1995c7eb2a0ef0.jpg'
      }],
      fileList4: [{
        name: '图片名称',
        url: 'https://img13.360buyimg.com/ling/jfs/t1/140106/11/5789/68021/5f3a3500E93dae718/3e1995c7eb2a0ef0.jpg'
      }],
      fileList5: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com/ling/jfs/t1/113331/7/16867/48717/5f50b97eE1e7730a8/32880e735dd48ae3.jpg'
      }],
      fileList6: [{
        name: '图片名称',
        url: 'https://img12.360buyimg.com/ling/jfs/t1/113331/7/16867/48717/5f50b97eE1e7730a8/32880e735dd48ae3.jpg'
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
