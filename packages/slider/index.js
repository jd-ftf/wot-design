/**
 * slider组件
 * 使用：
 * <jm-slider
 *   type="single"  // slider的类型，可选值 'single'，'double'，默认为
 * Toast({
 *   single: Boolean,     // 是否只展示1个Toast，默认为false
 *   msg: String,         // toast信息
 *   duration: Number,    // 持续时间，默认2000
 *   iconName: String,    // icon图标，可选值：'success', 'warn', 'forbid'(即X)
 *   iconClass: String,   // icon自定义图表，传入类名，多个类名以空格连接
 *   position: String     // toast位置，可选值：'top', 'middle', 'bottom'，default: 'middle'
 * })
 */

import Slider from './src/main'
import '@/style/components/slider.scss'

Slider.install = Vue => {
  Vue.component(Slider.name, Slider)
}

export default Slider
