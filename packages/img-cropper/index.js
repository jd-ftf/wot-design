import Vue from 'vue'
import wdImgCropper from './src/main.vue'

const defaultConfig = {
  urls: [],
  minZoom: 1 / 3,
  maxZoom: 3,
  onLongTap: null,
  onClose: null,
  onOpen: null,
  showIndex: true,
  current: 0,
  swipeDuration: 500
}

// 构造图片预览函数
const CropperConstructor = Vue.extend(wdImgCropper)

let imgCropper

const showCropper = (instance, options) => {
  instance.show = true
  Object.assign(instance, defaultConfig, options)

  if (options.onClose) {
    instance.$once('close', options.onClose)
  }

  if (options.onOpen) {
    instance.$once('open', options.onOpen)
  }

  if (!instance.inited) {
    document.body.appendChild(instance.$el)
    instance.inited = true
  }
  return instance
}

const ImgCropper = options => {
  options = options || {}

  if (!imgCropper) {
    imgCropper = new CropperConstructor({
      el: document.createElement('div')
    })
  }

  return showCropper(imgCropper, options)
}

export default {
  install (Vue) {
    Vue.component(wdImgCropper.name, wdImgCropper)
    Vue.prototype.$cropper = ImgCropper
  },
  wdImgCropper,
  ImgCropper
}
