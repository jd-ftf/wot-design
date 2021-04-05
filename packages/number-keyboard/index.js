import NumberKeyboard from './src/main.vue'

NumberKeyboard.install = Vue => {
  Vue.component(NumberKeyboard.name, NumberKeyboard)
}

export default NumberKeyboard
