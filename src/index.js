import Button from 'jm-design/button'
import Cell from 'jm-design/cell'
import CellGroup from 'jm-design/cellGroup'
import Checkbox from 'jm-design/checkbox'
import CheckboxGroup from 'jm-design/checkboxGroup'
import Icon from 'jm-design/icon'
import InfiniteLoad from 'jm-design/infiniteLoad'
import Input from 'jm-design/input'
import InputNumber from 'jm-design/inputNumber'
import Lazyload from 'jm-design/lazyload'
import Loading from 'jm-design/loading'
import MessageBox from 'jm-design/messageBox'
import Navbar from 'jm-design/navbar'
import PullRefresh from 'jm-design/pullRefresh'
import Radio from 'jm-design/radio'
import RadioGroup from 'jm-design/radioGroup'
import Rate from 'jm-design/rate'
import Search from 'jm-design/search'
import Slider from 'jm-design/slider'
import Switch from 'jm-design/switch'
import Swipe from 'jm-design/swipe'
import SwipeItem from 'jm-design/swipeItem'
import Tab from 'jm-design/tab'
import Tabs from 'jm-design/tabs'
import Toast from 'jm-design/toast'
import locale from './locale'

import lazyPlaceholder from './img/placeholder.png'

const components = [
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Icon,
  InfiniteLoad,
  Input,
  InputNumber,
  Loading.Indicator,
  MessageBox.jmMessageBox,
  Navbar,
  PullRefresh,
  Radio,
  RadioGroup,
  Rate,
  Search,
  Slider,
  Switch,
  Swipe,
  SwipeItem,
  Tab,
  Tabs
]

const install = (Vue, config = {}) => {
  locale.use(config.locale)

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$toast = Toast
  Vue.prototype.$loading = Loading.loading
  Vue.prototype.$messageBox = MessageBox.MessageBox

  Vue.use(Lazyload, Object.assign({
    loading: lazyPlaceholder,
    attempt: 3
  }, config.lazyload))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.2.5',
  locale,
  install,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Icon,
  InfiniteLoad,
  Input,
  InputNumber,
  Loading,
  MessageBox,
  Navbar,
  PullRefresh,
  Radio,
  RadioGroup,
  Rate,
  Search,
  Slider,
  Switch,
  Swipe,
  SwipeItem,
  Toast,
  Tab,
  Tabs
}
