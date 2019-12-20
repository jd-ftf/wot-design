import ActionSheet from './src/main.vue'

ActionSheet.install = Vue => {
  Vue.component(ActionSheet.name, ActionSheet)
}

export default ActionSheet
