/**
 * toast组件
 * 使用：
 * Toast({
 *   single: Boolean,     // 是否只展示1个Toast，默认为false
 *   msg: String,         // toast信息
 *   duration: Number,    // 持续时间，默认2000
 *   iconName: String,    // icon图标，可选值：'success', 'warn', 'forbid'(即X)
 *   iconClass: String,   // icon自定义图表，传入类名，多个类名以空格连接
 *   className: String,   // toast根节点样式，可选值
 *   position: String     // toast位置，可选值：'top', 'middle', 'bottom'，default: 'middle'
 * })
 */

import Vue from 'vue'
import jmToast from './src/main.vue'
import '@/style/base.scss'
import '@/style/components/toast.scss'

const ToastConstructor = Vue.extend(jmToast)

let toastList = []
let toastSingleTon

let getAnInstance = () => {
  if (toastList.length > 0) {
    return toastList.shift()
  }

  return new ToastConstructor({
    el: document.createElement('div')
  })
}

let reuturnAnInstance = instance => {
  if (instance) {
    toastList.push(instance)
  }
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

ToastConstructor.prototype.close = function (save) {
  this.show = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true

  if (save) {
    reuturnAnInstance(this)
  }
}

const showToast = (instance, options) => {
  let duration

  if (options.iconName) {
    if (options.iconName === 'check') {
      duration = 1500
    } else {
      duration = 3000
    }
  }

  duration = options.duration || duration || 3000
  instance.closed = false
  clearTimeout(instance.timer)
  instance.msg = typeof options === 'string' ? options : options.msg
  instance.position = options.position || 'middle'
  instance.className = options.className || ''
  instance.iconName = options.iconName || ''
  instance.iconClass = options.iconClass || ''

  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.show = true
    instance.$el.removeEventListener('transitionend', removeDom)
    instance.timer = setTimeout(() => {
      if (instance.closed) {
        return
      }
      instance.close(!options.single)
    }, duration)
  })

  return instance
}

let Toast = options => {
  options = options || {}

  if (!options.single) {
    let instance = getAnInstance()

    return showToast(instance, options)
  }

  if (!toastSingleTon) {
    toastSingleTon = getAnInstance()
  }

  if (toastSingleTon.show) return

  return showToast(toastSingleTon, options)
}

export default Toast
