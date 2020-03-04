
/* Automatically generated by './build/build-entry.js' */

import ActionSheet from '../packages/action-sheet'
import Badge from '../packages/badge'
import Button from '../packages/button'
import Cell from '../packages/cell'
import CellGroup from '../packages/cell-group'
import Checkbox from '../packages/checkbox'
import CheckboxGroup from '../packages/checkbox-group'
import Collapse from '../packages/collapse'
import CollapseItem from '../packages/collapse-item'
import DatetimePicker from '../packages/datetime-picker'
import DatetimePickerView from '../packages/datetime-picker-view'
import Icon from '../packages/icon'
import InfiniteLoad from '../packages/infinite-load'
import Input from '../packages/input'
import InputNumber from '../packages/input-number'
import Img from '../packages/img'
import Lazyload from '../packages/lazyload'
import Loading from '../packages/loading'
import MessageBox from '../packages/message-box'
import Modal from '../packages/modal'
import Navbar from '../packages/navbar'
import NoticeBar from '../packages/notice-bar'
import Picker from '../packages/picker'
import PickerView from '../packages/picker-view'
import Popup from '../packages/popup'
import Progress from '../packages/progress'
import PullRefresh from '../packages/pull-refresh'
import Radio from '../packages/radio'
import RadioGroup from '../packages/radio-group'
import Rate from '../packages/rate'
import Search from '../packages/search'
import Slider from '../packages/slider'
import Step from '../packages/step'
import Steps from '../packages/steps'
import Sticky from '../packages/sticky'
import Switch from '../packages/switch'
import Swipe from '../packages/swipe'
import SwipeItem from '../packages/swipe-item'
import SwipeAction from '../packages/swipe-action'
import Tab from '../packages/tab'
import Tabs from '../packages/tabs'
import Tabbar from '../packages/tabbar'
import TabbarItem from '../packages/tabbar-item'
import Tag from '../packages/tag'
import Toast from '../packages/toast'
import Tooltip from '../packages/tooltip'
import SortButton from '../packages/sort-button'
import DropMenu from '../packages/drop-menu'
import DropMenuItem from '../packages/drop-menu-item'
import Grid from '../packages/grid'
import GridItem from '../packages/grid-item'
import Row from '../packages/row'
import Col from '../packages/col'
import StatusTip from '../packages/status-tip'
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
  DatetimePickerView,
  Icon,
  InfiniteLoad,
  Input,
  InputNumber,
  Img,
  Loading,
  Modal,
  Navbar,
  NoticeBar,
  Picker,
  PickerView,
  Popup,
  Progress,
  PullRefresh,
  Radio,
  RadioGroup,
  Rate,
  Search,
  Slider,
  Step,
  Steps,
  Sticky,
  Switch,
  Swipe,
  SwipeItem,
  SwipeAction,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Tag,
  Tooltip,
  SortButton,
  DropMenu,
  DropMenuItem,
  Grid,
  GridItem,
  Row,
  Col,
  StatusTip,
  MessageBox.wdMessageBox
]

const install = (Vue, config = {}) => {
  locale.use(config.locale)
  locale.i18n(config.i18n)

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$toast = Toast
  Vue.prototype.$messageBox = MessageBox.MessageBox

  Vue.use(Lazyload, config.lazyload)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.3.0',
  install,
  locale: locale.use,
  i18n: locale.i18n,
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
  DatetimePickerView,
  Icon,
  InfiniteLoad,
  Input,
  InputNumber,
  Img,
  Lazyload,
  Loading,
  MessageBox,
  Modal,
  Navbar,
  NoticeBar,
  Picker,
  PickerView,
  Popup,
  Progress,
  PullRefresh,
  Radio,
  RadioGroup,
  Rate,
  Search,
  Slider,
  Step,
  Steps,
  Sticky,
  Switch,
  Swipe,
  SwipeItem,
  SwipeAction,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Tag,
  Toast,
  Tooltip,
  SortButton,
  DropMenu,
  DropMenuItem,
  Grid,
  GridItem,
  Row,
  Col,
  StatusTip
}
