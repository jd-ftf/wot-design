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

Toast.close = () => {
  if (toast) {
    toast.close()
  }
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

Toast.info = options => {
  if (typeof options === 'string') {
    options = {
      msg: options,
      iconName: 'info'
    }
  } else {
    options = {
      ...options,
      iconName: 'info'
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

Toast.loading = options => {
  if (typeof options === 'string') {
    options = {
      forbidClick: true,
      msg: options,
      duration: 0,
      iconName: 'loading'
    }
  } else {
    options = {
      forbidClick: true,
      ...options,
      duration: 0,
      iconName: 'loading'
    }
  }

  return Toast(options)
}

Toast.install = Vue => {
  Vue.prototype.$toast = Toast
}

export default Toast
