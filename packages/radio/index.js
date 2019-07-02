import Radio from './src/main.vue'

Radio.install = Vue => {
  Vue.component(Radio.name, Radio)
}

export default Radio
