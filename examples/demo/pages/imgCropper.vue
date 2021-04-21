<template>
  <div class="page-img">
    <demo-block title="基本用法" style="text-align: center">
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
          @click="upload"
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
    </demo-block>

    <wd-img-cropper
      id="wd-img-cropper"
      v-model="show"
      :img-src="imgSrc"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
    </wd-img-cropper>
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

<style lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 300px;
}

.profile-img {
  border: 1px solid rgba(0, 0, 0, 0.09);
}
.img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.04);
  position: relative;
}
.img-icon {
  font-size: 60px;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
