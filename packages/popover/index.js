import Popover from './src/main'

Popover.install = Vue => {
  Vue.component(Popover.name, Popover)
}

export default Popover
