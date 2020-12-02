import Vue from 'vue'
import wdImgPreview from './src/main.vue'

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
const PreviewConstructor = Vue.extend(wdImgPreview)

let imgPreview

const showPreviewList = (instance, options) => {
  instance.show = true
  Object.assign(instance, defaultConfig, options)

  if (options.onClose) {
    instance.$once('close', options.onClose)
  }

  if (options.onOpen) {
    instance.$once('open', options.onOpen)
  }

  if (options.onLongTap) {
    instance.$on('long-tap', options.onLongTap)
  }

  if (!instance.inited) {
    document.body.appendChild(instance.$el)
    instance.inited = true
  }
  return instance
}

const ImgPreview = options => {
  options = options || {}

  if (!imgPreview) {
    imgPreview = new PreviewConstructor({
      el: document.createElement('div')
    })
  }

  return showPreviewList(imgPreview, options)
}

export default {
  install (Vue) {
    Vue.component(wdImgPreview.name, wdImgPreview)
    Vue.prototype.$preview = ImgPreview
  },
  wdImgPreview,
  ImgPreview
}
