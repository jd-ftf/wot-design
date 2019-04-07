import Button from './src/main.vue'
import '@/style/button.scss'

Button.install = Vue => {
  Vue.component(Button.name, Button)
}

export default Button
