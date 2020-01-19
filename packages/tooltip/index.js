import Tooltip from './src/main'

/* istanbul ignore next */
Tooltip.install = (Vue) => {
  Vue.component(Tooltip.name, Tooltip)
}

export default Tooltip
