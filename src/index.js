import Toast from 'jm-design/toast/index.js'

const components = [

]

const JMDesign = {
  install: Vue => {
    components.forEach(component => {
      Vue.component(component.name, component)
    })

    Vue.$toast = Vue.prototype.$toast = Toast
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  JMDesign.install(window.Vue)
}

export {
  Toast
}

export default JMDesign
