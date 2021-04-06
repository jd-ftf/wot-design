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
          mode="aspectFit"
          class="profile-img"
          @click="preview"
        />
      </div>

      <wd-upload
        ref="upload"
        v-model="fileList"
        :show-list="false"
        :before-upload="beforeUpload"
        @success="handleSuccess"
        action="https://ling.jd.com/atom/api_v2/upload/jdimage"
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
      imgSrc: 'http://img11.360buyimg.com/img/jfs/t1/113350/16/3837/423464/5eaa681cE92b8f63f/243ded8ae363db28.png',
    }
  },

  methods: {
    upload () {
      const target = this.$refs.upload
      target.$refs.input.click()
    },

    beforeUpload ({ files, resolve }) {
      this.$toast.loading('上传中')
      resolve(true)
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
      reader.readAsDataURL(file.file)
    },

    handleSuccess (file) {
      this.$toast.success('上传成功')
      this.fileList = [file]
      this.loadFile(file.file)
      console.log(this.fileList)
    },

    handleConfirm (res) {
      console.log(res)
    },

    handleCancel () {
      console.log('取消')
    },

    preview () {
      this.show = true
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
