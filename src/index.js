import Button from 'jm-design/button'
import Icon from 'jm-design/icon'
import InfiniteLoad from 'jm-design/infiniteLoad'
import Navbar from 'jm-design/navbar'
import Rate from 'jm-design/rate'
import Search from 'jm-design/search'
import Slider from 'jm-design/slider'
import Toast from 'jm-design/toast'
import Loading from 'jm-design/loading'

const components = [
  Button,
  Icon,
  InfiniteLoad,
  Navbar,
  Slider,
  Loading.Indicator,
  Search,
  Rate
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
