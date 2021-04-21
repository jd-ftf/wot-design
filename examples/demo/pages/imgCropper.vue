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
      <input style="position: absolute; top: 0; left: 0; width: 0; height: 0; opacity: 0;" type="file" ref="input" @change="chooseFile" />
      <p>点击上传头像</p>
    </demo-block>

    <wd-img-cropper
      v-model="show"
      :img-src="imgSrc"
      file-type="image/jpeg"
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
      loadSrc: '',
      show: false,
      imgSrc: ''
    }
  },
  methods: {
    upload () {
      this.$refs.input.click()
    },
    chooseFile (e) {
      const { files } = e.target
      const reader = new FileReader()
      reader.onload = (e) => {
        const { result } = e.target
        this.imgSrc = result
        this.show = true
        this.$refs.input.value = null
      }
      reader.readAsDataURL(files[0])
    },
    handleConfirm ({ url }) {
      this.loadSrc = url
      // 使用 res.file 对象进行上传
    },
    handleCancel () {
      console.log('取消')
    }
  }
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
