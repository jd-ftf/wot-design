import SelectPicker from './src/main.vue'

SelectPicker.install = Vue => {
  Vue.component(SelectPicker.name, SelectPicker)
}

export default SelectPicker
