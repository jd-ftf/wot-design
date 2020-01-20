/**
 * tooltip组件
 * 使用：
 * <wd-tooltip
 *   属性：
 *   type           // 类型，可选值"single"，"double"，默认值为"single"
 *   :value         // 初始值，类型是Array，默认值是[0, 0]
 *   :min-value     // 最小值，类型是Number，默认值为0
 *   :max-value     // 最大值，类型是Number，默认值为100
 *   :step          // 步长，类型是Number，默认值为1
 *   :disabled      // 是否禁用，类型是Boolean，默认值为false
 *   :show-label    // 是否展示当前值，类型是Boolean，默认值为true
 *   :show-min-max  // 是否展示最大值最小值，类型是Boolean，默认值为true
 *   事件：
 *   @slidingstart  // 滑动开始事件
 *   @sliding       // 滑动中事件
 *   @slidingend    // 滑动结束事件
 *   @change        // 值改变事件
 *   @input         // 操作滑块事件
 * ></wd-tooltip>
 */
import Tooltip from './src/main'

Tooltip.install = Vue => {
  Vue.component(Tooltip.name, Tooltip)
}

export default Tooltip
