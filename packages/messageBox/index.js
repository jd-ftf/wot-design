/**
 * MessageBox组件，提供alert，confirm，prompt格式
 * 使用：
 * Message.alert(message[, title, options])
 * Message.confirm(message[, title, options])
 * Message.prompt(message[, title, options])
 */
import Vue from 'vue'
import jmMessageBox from './src/main.vue'

let defaults = {
  title: '',
  msg: '', // message可以是html格式
  type: 'alert',
  showInput: false,
  closeOnClickModal: true, // 是否可以点击幕布关闭
  inputType: 'text', // prompt中input类型
  inputValue: '', // prompt中input数据
  inputPattern: '', // prompt中验证input数据的正则表达式
  inputValidate: '', // prompt中验证input数据的函数
  showConfirmButton: true,
  showCancelButton: false
}

const merge = (target, ...args) => {
  for (let i = 0; i < args.length; i++) {
    let source = args[i]
    if (source) {
      for (let [key, value] of Object.entries(source)) {
        target[key] = value
      }
    }
  }

  return target
}

let currentMsg
let instance
let msgQueue = []

const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action)
      } else {
        callback(action)
      }
    }
    if (currentMsg.resolve) {
      let type = currentMsg.options.type
      if (type === 'confirm' || type === 'prompt') {
        if (action === 'confirm') {
          if (instance.showInput) {
            currentMsg.resolve({
              value: instance.inputValue,
              action
            })
          } else {
            currentMsg.resolve(action)
          }
        } else if (action === 'cancel' && currentMsg.reject) {
          currentMsg.reject(action)
        }
      } else {
        currentMsg.resolve(action)
      }
    }
  }
}

const MessageBoxContructor = Vue.extend(jmMessageBox)

let initInstance = () => {
  instance = new MessageBoxContructor({
    el: document.createElement('div')
  })

  instance.callback = defaultCallback
}

let showNextMsg = () => {
  if (!instance) {
    initInstance()
  }

  if (!instance.show) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift()

      let options = currentMsg.options
      for (let [key, value] of Object.entries(options)) {
        instance[key] = value
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback
      }
      if (instance.closeOnClickModal === undefined) {
        instance.closeOnClickModal = true
      }
      document.body.appendChild(instance.$el)

      Vue.nextTick(() => {
        instance.show = true
      })
    }
  }
}

/* eslint-disable */
const MessageBox = (options, callback) => {
  if (typeof options === 'string') {
    options = {
      title: options
    }
    if (arguments[1]) {
      options.msg = arguments[1]
    }
    if (arguments[2]) {
      options.type = arguments[2]
    }
  } else if (options.callback && !callback) {
    callback = options.callback
  }

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      msgQueue.push({
        options: merge({}, defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      })

      showNextMsg()
    })
  } else {
    msgQueue.push({
      options: merge({}, defaults, options),
      callback: callback
    })

    showNextMsg()
  }
}
/* eslint-disable */

MessageBox.alert = (msg, title, options) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  }

  return MessageBox(merge({
    title: title,
    msg: msg,
    type: 'alert',
    closeOnClickModal: false
  }, options))
}

MessageBox.confirm = (msg, title, options) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  }

  return MessageBox(merge({
    title: title,
    msg: msg,
    type: 'confirm',
    showCancelButton: true
  }, options))
}

MessageBox.prompt = (title, options) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  }

  return MessageBox(merge({
    title: title,
    type: 'prompt',
    showCancelButton: true,
    showInput: true
  }, options))
}

MessageBox.close = () => {
  if (!instance) {
    return
  }

  instance.show = false
  msgQueue = []
  currentMsg = null
}

export default {
  install (Vue) {
    Vue.component(jmMessageBox, jmMessageBox)
    Vue.prototype.$messageBox = MessageBox
  },
  jmMessageBox,
  MessageBox
}
