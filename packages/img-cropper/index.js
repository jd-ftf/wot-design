import ImgCropper from './src/main.vue'

ImgCropper.install = Vue => {
  Vue.component(ImgCropper.name, ImgCropper)
}

export default ImgCropper
