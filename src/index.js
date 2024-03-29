
/* Automatically generated by './build/build-entry.js' */

import ActionSheet from '../packages/action-sheet'
import Badge from '../packages/badge'
import Button from '../packages/button'
import Calendar from '../packages/calendar'
import CalendarView from '../packages/calendar-view'
import Cell from '../packages/cell'
import CellGroup from '../packages/cell-group'
import Checkbox from '../packages/checkbox'
import CheckboxGroup from '../packages/checkbox-group'
import Col from '../packages/col'
import Collapse from '../packages/collapse'
import CollapseItem from '../packages/collapse-item'
import ColPicker from '../packages/col-picker'
import Card from '../packages/card'
import Curtain from '../packages/curtain'
import DatetimePicker from '../packages/datetime-picker'
import DatetimePickerView from '../packages/datetime-picker-view'
import Divider from '../packages/divider'
import DropMenu from '../packages/drop-menu'
import DropMenuItem from '../packages/drop-menu-item'
import Grid from '../packages/grid'
import GridItem from '../packages/grid-item'
import Icon from '../packages/icon'
import InfiniteLoad from '../packages/infinite-load'
import Input from '../packages/input'
import InputNumber from '../packages/input-number'
import Img from '../packages/img'
import ImgPreview from '../packages/img-preview'
import ImgCropper from '../packages/img-cropper'
import Lazyload from '../packages/lazyload'
import Loading from '../packages/loading'
import MessageBox from '../packages/message-box'
import Modal from '../packages/modal'
import Navbar from '../packages/navbar'
import NoticeBar from '../packages/notice-bar'
import NumberKeyboard from '../packages/number-keyboard'
import Pagination from '../packages/pagination'
import Picker from '../packages/picker'
import PickerView from '../packages/picker-view'
import Popover from '../packages/popover'
import Popup from '../packages/popup'
import Progress from '../packages/progress'
import PullRefresh from '../packages/pull-refresh'
import Radio from '../packages/radio'
import RadioGroup from '../packages/radio-group'
import Rate from '../packages/rate'
import Row from '../packages/row'
import Search from '../packages/search'
import SelectPicker from '../packages/select-picker'
import Slider from '../packages/slider'
import SortButton from '../packages/sort-button'
import StatusTip from '../packages/status-tip'
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
import Anchor from '../packages/anchor'
import Tag from '../packages/tag'
import Toast from '../packages/toast'
import Tooltip from '../packages/tooltip'
import Upload from '../packages/upload'
import locale from './locale'

const components = [
  ActionSheet,
  Badge,
  Button,
  Calendar,
  CalendarView,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  ColPicker,
  Card,
  Curtain,
  DatetimePicker,
  DatetimePickerView,
  Divider,
  DropMenu,
  DropMenuItem,
  Grid,
  GridItem,
  Icon,
  InfiniteLoad,
  Input,
  InputNumber,
  Img,
  ImgCropper,
  Loading,
  Modal,
  Navbar,
  NoticeBar,
  NumberKeyboard,
  Pagination,
  Picker,
  PickerView,
  Popover,
  Popup,
  Progress,
  PullRefresh,
  Radio,
  RadioGroup,
  Rate,
  Row,
  Search,
  SelectPicker,
  Slider,
  SortButton,
  StatusTip,
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
  Anchor,
  Tag,
  Tooltip,
  Upload,
  MessageBox.wdMessageBox,
  ImgPreview.wdImgPreview
]

const install = (Vue, config = {}) => {
  locale.use(config.locale)
  locale.i18n(config.i18n)

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  const {
    toastKey = '$toast',
    messageBoxKey = '$messageBox',
    previewKey = '$preview'
  } = config

  Vue.prototype[toastKey] = Toast
  Vue.prototype[messageBoxKey] = MessageBox.MessageBox
  Vue.prototype[previewKey] = ImgPreview.ImgPreview

  Vue.use(Lazyload, config.lazyload)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '2.4.1',
  install,
  locale: locale.use,
  i18n: locale.i18n,
  ActionSheet,
  Badge,
  Button,
  Calendar,
  CalendarView,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  ColPicker,
  Card,
  Curtain,
  DatetimePicker,
  DatetimePickerView,
  Divider,
  DropMenu,
  DropMenuItem,
  Grid,
  GridItem,
  Icon,
  InfiniteLoad,
  Input,
  InputNumber,
  Img,
  ImgPreview,
  ImgCropper,
  Lazyload,
  Loading,
  MessageBox,
  Modal,
  Navbar,
  NoticeBar,
  NumberKeyboard,
  Pagination,
  Picker,
  PickerView,
  Popover,
  Popup,
  Progress,
  PullRefresh,
  Radio,
  RadioGroup,
  Rate,
  Row,
  Search,
  SelectPicker,
  Slider,
  SortButton,
  StatusTip,
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
  Anchor,
  Tag,
  Toast,
  Tooltip,
  Upload
}
