import Step from './src/main.vue'

Step.install = Vue => {
  Vue.component(Step.name, Step)
}

export default Step
