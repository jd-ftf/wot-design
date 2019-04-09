import Button from 'jm-design/button'
import Icon from 'jm-design/icon'
import InfiniteLoad from 'jm-design/infiniteLoad'
import Loading from 'jm-design/loading'
import MessageBox from 'jm-design/messageBox'
import Navbar from 'jm-design/navbar'
import PullRefresh from 'jm-design/pullRefresh'
import Rate from 'jm-design/rate'
import Search from 'jm-design/search'
import Slider from 'jm-design/slider'
import Toast from 'jm-design/toast'

const components = [
  Button,
  Icon,
  InfiniteLoad,
  Navbar,
  Slider,
  Loading.Indicator,
  MessageBox.jmMessageBox,
  Search,
  Rate,
  PullRefresh
]

const install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$toast = Toast
  Vue.prototype.$loading = Loading.loading
  Vue.prototype.$messageBox = MessageBox.MessageBox
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.2.5',
  install,
  Button,
  Icon,
  InfiniteLoad,
  Navbar,
  Slider,
  Loading,
  MessageBox,
  Search,
  Rate,
  PullRefresh,
  Toast
}
