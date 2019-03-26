/**
 * loading组件
 * 使用方法：
 * Loading.open({
 *   msg: String,           // loading图显示的文字
 *   iconName: String,     // loading图标，可选项只有'loading'，默认值是'loading'
 *   iconClass: String     // loading自定义样式
 * })
 * Loading.close()
 */

import Vue from 'vue'
import jmLoading from './main.vue'

const LoadingConstructor = Vue.extend(jmLoading)
let instance

const Loading = {
  open (options = {}) {
    if (!instance) {
      instance = new LoadingConstructor({
        el: document.createElement('div')
      })
      document.body.appendChild(instance.$el)
    }
    if (instance.show) {
      return
    }
    instance.msg = typeof options === 'string' ? options : options.msg || ''
    instance.type = typeof options === 'string' ? 'circle' : options.type || ''

    Vue.nextTick(() => {
      instance.show = true
    })
  },

  close () {
    if (instance) {
      instance.show = false
    }
  }
}

export default Loading
