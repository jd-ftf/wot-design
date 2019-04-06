import '@/style/icon.scss'
import Icon from './src/main'

Icon.install = Vue => {
  Vue.component(Icon.name, Icon)
}

export default Icon
