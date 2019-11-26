import ActionSheet from 'jm-design/actionSheet'
import Badge from 'jm-design/badge'
import Button from 'jm-design/button'
import Cell from 'jm-design/cell'
import CellGroup from 'jm-design/cellGroup'
import Checkbox from 'jm-design/checkbox'
import CheckboxGroup from 'jm-design/checkboxGroup'
import Collapse from 'jm-design/collapse'
import CollapseItem from 'jm-design/collapseItem'
import DatetimePicker from 'jm-design/datetimePicker'
import Icon from 'jm-design/icon'
import InfiniteLoad from 'jm-design/infiniteLoad'
import Input from 'jm-design/input'
import InputNumber from 'jm-design/inputNumber'
import Lazyload from 'jm-design/lazyload'
import Loading from 'jm-design/loading'
import MessageBox from 'jm-design/messageBox'
import Navbar from 'jm-design/navbar'
import NoticeBar from 'jm-design/noticeBar'
import Picker from 'jm-design/picker'
import PickerView from 'jm-design/pickerView'
import Popup from 'jm-design/popup'
import PullRefresh from 'jm-design/pullRefresh'
import Progress from 'jm-design/progress'
import Radio from 'jm-design/radio'
import RadioGroup from 'jm-design/radioGroup'
import Rate from 'jm-design/rate'
import Search from 'jm-design/search'
import Slider from 'jm-design/slider'
import Step from 'jm-design/step'
import Steps from 'jm-design/steps'
import Switch from 'jm-design/switch'
import Swipe from 'jm-design/swipe'
import SwipeItem from 'jm-design/swipeItem'
import Tab from 'jm-design/tab'
import Tabs from 'jm-design/tabs'
import Tabbar from 'jm-design/tabbar'
import TabbarItem from 'jm-design/tabbarItem'
import Tag from 'jm-design/tag'
import Toast from 'jm-design/toast'
import locale from './locale'

const components = [
  ActionSheet,
  Badge,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapseItem,
  DatetimePicker,
  Icon,
  InfiniteLoad,
  Input,
  InputNumber,
  Loading.Indicator,
  MessageBox.jmMessageBox,
  Navbar,
  NoticeBar,
  Picker,
  PickerView,
  Popup,
  PullRefresh,
  Progress,
  Radio,
  RadioGroup,
  Rate,
  Search,
  Slider,
  Step,
  Steps,
  Switch,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Tag
]

const install = (Vue, config = {}) => {
  locale.use(config.locale)

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$toast = Toast
  Vue.prototype.$loading = Loading.loading
  Vue.prototype.$messageBox = MessageBox.MessageBox

  Vue.use(Lazyload, config.lazyload)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.2.5',
  locale,
  install,
  Badge,
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
