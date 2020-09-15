
/**
 * v-clickoutsid
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-clickoutside="close">
 * ```
 */
const clickoutside = {
  // 初始化指令
  bind (el, binding, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.value) {
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
export default clickoutside
