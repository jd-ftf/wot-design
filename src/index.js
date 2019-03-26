import Button from 'jm-design/button/index.js'
import Navbar from 'jm-design/navbar/index.js'
import Toast from 'jm-design/toast/index.js'
import Slider from 'jm-design/slider/index.js'
import Loading from 'jm-design/loading/index.js'
import Search from 'jm-design/search/index.js'

const components = [
  Button,
  Navbar,
  Slider,
  Loading.Indicator,
  Search
]

const JMDesign = {
  install: Vue => {
    components.forEach(component => {
      Vue.component(component.name, component)
    })

    Vue.prototype.$toast = Toast
    Vue.prototype.$loading = Loading.loading
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  JMDesign.install(window.Vue)
}

export {
  Toast
}

export default JMDesign
