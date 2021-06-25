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
import wdToast from './src/main.vue'

const ToastConstructor = Vue.extend(wdToast)

let toast

ToastConstructor.prototype.close = function () {
  this.show = false
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
  instance.iconSize = options.iconSize || '42px'
  instance.loadingType = options.loadingType || 'outline'
  instance.loadingColor = options.loadingColor || '#4D80F0'
  instance.onClose = options.onClose

  if (!instance.inited) {
    document.body.appendChild(instance.$el)
    instance.inited = true
  }

  Vue.nextTick(() => {
    instance.show = true
    if (duration > 0) {
      instance.timer = setTimeout(() => {
        if (instance.closed) {
          return
        }
        instance.close()
        instance.onClose && instance.onClose(instance)
      }, duration)
    }
  })

  return instance
}

let Toast = options => {
  options = options || {}

  switch (options.type) {
    case 'success': {
      options.iconName = 'success'
      options.duration = options.duration || 1500
      break
    }
    case 'info': {
      options.iconName = 'info'
      break
    }
    case 'error': {
      options.iconName = 'error'
      break
    }
    case 'warning': {
      options.iconName = 'warning'
      break
    }
    case 'loading': {
      options.iconName = 'loading'
      options.forbidClick = true
      options.duration = 0
      break
    }
    default: {}
  }

  if (!toast) {
    toast = new ToastConstructor({
      el: document.createElement('div')
    })
  }

  return showToast(toast, options)
}

Toast.close = () => {
  if (toast) {
    toast.close()
    toast.onClose && toast.onClose(toast)
  }
}

Toast._close = () => {
  if (toast) {
    toast.close()
  }
}

Toast.success = options => {
  if (typeof options === 'string') {
    options = {
      msg: options,
      type: 'success'
    }
  } else {
    options = {
      ...options,
      type: 'success'
    }
  }

  return Toast(options)
}

Toast.info = options => {
  if (typeof options === 'string') {
    options = {
      msg: options,
      type: 'info'
    }
  } else {
    options = {
      ...options,
      type: 'info'
    }
  }

  return Toast(options)
}

Toast.error = options => {
  if (typeof options === 'string') {
    options = {
      msg: options,
      type: 'error'
    }
  } else {
    options = {
      ...options,
      type: 'error'
    }
  }

  return Toast(options)
}

Toast.warning = options => {
  if (typeof options === 'string') {
    options = {
      type: 'warning',
      msg: options
    }
  } else {
    options = {
      ...options,
      type: 'warning'
    }
  }

  return Toast(options)
}

Toast.loading = options => {
  if (typeof options === 'string') {
    options = {
      type: 'loading',
      msg: options
    }
  } else {
    options = {
      ...options,
      type: 'loading'
    }
  }

  return Toast(options)
}

window.addEventListener('popstate', Toast._close)

Toast.install = (Vue, { toastKey = '$toast' } = {}) => {
  Vue.prototype[toastKey] = Toast
}

export default Toast
