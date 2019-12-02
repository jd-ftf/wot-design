/**
 * toast组件
 * 使用：
 * Toast({
 *   msg: String,         // toast信息
 *   duration: Number,    // 持续时间，默认2000
 *   iconName: String,    // icon图标，可选值：'success', 'warn', 'forbid'(即X)
 *   iconClass: String,   // icon自定义图表，传入类名，多个类名以空格连接
 *   position: String     // toast位置，可选值：'top', 'middle', 'bottom'，default: 'middle'
 * })
 */

/**
 * Todo: 需要优化调用方法。
 */

import Vue from 'vue'
import jmToast from './src/main.vue'

const ToastConstructor = Vue.extend(jmToast)

let toast

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

ToastConstructor.prototype.close = function () {
  this.show = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
}

const showToast = (instance, options) => {
  let duration = options.duration === 0 ? 0 : (options.duration || 2000)
  instance.closed = false
  clearTimeout(instance.timer)
  instance.msg = typeof options === 'string' ? options : options.msg
  instance.position = options.position || 'middle'
  instance.iconName = options.iconName || ''
  instance.iconClass = options.iconClass || ''

  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.show = true
    instance.$el.removeEventListener('transitionend', removeDom)
    if (duration > 0) {
      instance.timer = setTimeout(() => {
        if (instance.closed) {
          return
        }
        instance.close()
      }, duration)
    }
  })

  return instance
}

let Toast = options => {
  options = options || {}

  if (!toast) {
    toast = new ToastConstructor({
      el: document.createElement('div')
    })
  }

  return showToast(toast, options)
}

Toast.success = options => {
  if (typeof options === 'string') {
    options = {
      msg: options,
      iconName: 'success',
      duration: 1500
    }
  } else {
    options = {
      ...options,
      iconName: 'success',
      duration: options.duration || 1500
    }
  }

  return Toast(options)
}

Toast.error = options => {
  if (typeof options === 'string') {
    options = {
      msg: options,
      iconName: 'error'
    }
  } else {
    options = {
      ...options,
      iconName: 'error'
    }
  }

  return Toast(options)
}

Toast.warning = options => {
  if (typeof options === 'string') {
    options = {
      msg: options,
      iconName: 'warning'
    }
  } else {
    options = {
      ...options,
      iconName: 'warning'
    }
  }

  return Toast(options)
}

Toast.install = Vue => {
  Vue.prototype.$toast = Toast
}

export default Toast
