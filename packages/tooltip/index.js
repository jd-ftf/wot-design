/**
 * tooltip组件
 * 使用：
 * <wd-tooltip
 *   属性：
 *   :mode         // 模式 menu || normal
 *   :placement     // Tooltip 的出现位置
 *   :effect     // 默认提供的主题
 *   :content          // 显示的内容，也可以通过 `slot#content` 传入
 *   :disabled      // 是否禁用，类型是Boolean，默认值为false
 *   :visible-arrow    // 是否显示 Tooltip 箭头
 *   :offset  // 出现位置的偏移量
 *   :open-delay  // 是否展示最大值最小值，类型是Boolean，默认值为true
 *   事件：
 *   @hide  // 隐藏时触发
 *   @show       // 显示时触发
 *   @menu-click    // 菜单点击时触发
 * ></wd-tooltip>
 */
import Tooltip from './src/main'

Tooltip.install = Vue => {
  Vue.component(Tooltip.name, Tooltip)
}

export default Tooltip
