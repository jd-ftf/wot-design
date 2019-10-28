import PickerView from './src/main.vue'

PickerView.install = Vue => {
  Vue.component(PickerView.name, PickerView)
}

export default PickerView
