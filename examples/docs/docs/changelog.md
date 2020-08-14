## 更新日志

### 2.0.0

*2020-08-07*

#### 新特性

- CheckboxGroup
  - 新增属性 `cell`, 支持复选框组下的表单模式事件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- RadioGroup
  - 新增属性 `cell`, 支持单选组下的表单模式事件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `size`, 支持单选框尺寸更改（normal、small） (by [@HXCStudio123](https://github.com/HXCStudio123) )
- DatetimePicker
  - 属性 `value` 添加 `Array` 格式，用来支持区域选择下的 上方picker选中值 及 下方picker选中值。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `columns-height`, 支持设置 picker 内部的单个 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `required`, 支持开启校验模式 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增默认插槽，可更改默认唤起 picker 的形式（默认为cell）。(by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增插槽 `range-separator`，区域选择时，中间展示的分隔符插槽。(by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 将 pickerView 交互形式更改为滚筒交互。 (by [@HXCStudio123](https://github.com/HXCStudio123) )

- DatetimePickerView
  - 新增属性 `columns-height`, 支持设置 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `column-formatter`, 支持自定义处理列项数组，接收 pickerView 实例、pickerView 源数组 originColumns、pickerView 每个属性的范围 ranges、当前 pickerView 的 value 作为入参，根据选中项和边界范围进行判断，通过 pickerView 实例暴露出来的 getPickerValue 获取对数据进行数组转换 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 将 pickerView 交互形式更改为滚筒交互。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Picker
  - 新增属性 `columns-height`, 支持设置 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `required`, 支持开启校验模式 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 将 pickerView 交互形式更改为滚筒交互。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增默认插槽，可更改默认唤起 picker 的形式（默认为cell）。(by [@HXCStudio123](https://github.com/HXCStudio123) )
- PickerView
  - 新增属性 `columns-height`, 支持设置 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 将 pickerView 交互形式更改为滚筒交互。 (by [@HXCStudio123](https://github.com/HXCStudio123) )

#### Bug 修复

- Checkbox
  - 修复复选框组禁用模式下，单项禁用失效问题 (by [@HXCStudio123](https://github.com/HXCStudio123) )

#### 优化

- DropMenu
  - 标题修改为水平居中 (by [@yawuling](https://github.com/yawuling) )
- Doc
  - Grid 文档补全页面导航 (by [@yawuling](https://github.com/yawuling) )
  - Swipe 文档暴露 `prev`，`next`，`swipeTo` 方法 (by [@yawuling](https://github.com/yawuling) )
  - 优化文档的响应式 (by [@yawuling](https://github.com/yawuling) )
  - 添加爬虫文件sitemap，优化搜索功能 (by [@HXCStudio123](https://github.com/HXCStudio123) )

### 1.5.1

*2020-05-18*

#### Bug 修复

- Swipe
  - 修复只有1项时的滑动异常 (by [@yawuling](https://github.com/yawuling) )

#### 优化

- Doc
  - 优化文档的响应式 (by [@yawuling](https://github.com/yawuling) )

### 1.5.0

*2020-05-13*

#### 新特性

- Checkbox
  - 支持复选框组下的单个复选框触发 `change` 事件 (by [@yawuling](https://github.com/yawuling) )
- Swipe
  - 新增属性 `animate` (by [@yawuling](https://github.com/yawuling) )

#### Bug 修复

- Toast
  - 修复文案过长不换行导致超出页面的问题 (by [@yawuling](https://github.com/yawuling) )

#### 优化

- DropMenu
  - 标题修改为水平居中 (by [@yawuling](https://github.com/yawuling) )
- Doc
  - Grid 文档补全页面导航 (by [@yawuling](https://github.com/yawuling) )
  - Swipe 文档暴露 `prev`，`next`，`swipeTo` 方法 (by [@yawuling](https://github.com/yawuling) )
  - 优化文档的响应式 (by [@yawuling](https://github.com/yawuling) )
  - 添加爬虫文件sitemap，优化搜索功能 (by [@HXCStudio123](https://github.com/HXCStudio123) )

### 1.4.1

*2020-03-22*

#### Bug 修复

- 修复新组件入口文件未引入注册问题 (by [@yawuling](https://github.com/yawuling) )

#### 优化

- Doc
  - 修复 DropMenu 文档组件名错误问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复 Tabs 文档组件名错误问题 (by [@yawuling](https://github.com/yawuling) )
- Demo
  - 修复 DropMenu demo 的展示 (by [@yawuling](https://github.com/yawuling) )

### 1.4.0

*2020-03-13*

#### 新特性

- Col
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- DropMenu
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Grid
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Img
  - 新增组件 (by [@houtianfu](https://github.com/houtf) )
- Row
  - 新增组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- SortButton
  - 新增组件 (by [@Gkxie](https://github.com/Gkxie) )
- StatusTip
  - 新增组件 (by [@RedJoy](https://github.com/RedJoy) )

#### Bug 修复

- Cell
  - 修复标签包裹问题 (by [@yawuling](https://github.com/yawuling) )
- Checkbox
  - 修正单个复选框下的change事件触发和入参 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 修复多级联动，修改内部值后取消恢复数据源； (by [@yawuling](https://github.com/yawuling) )
  - 修复 column-change 异步情况下无法准确获取值的问题 (by [@yawuling](https://github.com/yawuling) )
- PickerView
  - 修复columns为空数组情况下的内存溢出 (by [@yawuling](https://github.com/yawuling) )
- Slider
  - 修正slider样式 (by [@yawuling](https://github.com/yawuling) )
- Search
  - 高度问题修复 (by [@HXCStudio123](https://github.com/HXCStudio123) )

#### 优化

- Doc
  - 自定义主题 (by [@yawuling](https://github.com/yawuling) )
  - 新增Col/Row组合使用Layout文档 (by [@HXCStudio123](https://github.com/HXCStudio123) )

### 1.3.0

*2020-02-11*

#### 新特性

- Cell
  - 新增属性`size`, `title-width`, `center`, `replace` (by [@yawuling](https://github.com/yawuling) )
- Checkbox
  - 新增属性`inline` (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - 新增属性`size`, `label-width`, `error`, `align-right` (by [@yawuling](https://github.com/yawuling) )
  - 添加与 CellGroup 组件的关联 (by [@yawuling](https://github.com/yawuling) )
- Input
  - 新增属性`label`, `label-width`, `size`, `error`, `center` (by [@yawuling](https://github.com/yawuling) )
  - 新增插槽`label` (by [@yawuling](https://github.com/yawuling) )
  - 添加与 CellGroup 组件的关联 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 新增属性`size`, `label-width`, `error`, `align-right` (by [@yawuling](https://github.com/yawuling) )
  - 添加与 CellGroup 组件的关联 (by [@yawuling](https://github.com/yawuling) )
- Radio
  - 新增属性`inline` (by [@yawuling](https://github.com/yawuling) )
- SwipeAction
  - 新增组件 (by [@Gkxie](https://github.com/Gkxie) )
- Tag
  - 新增属性`dynamic`，支持新增标签操作 (by @awjing )

#### Bug 修复

- Search
  - 修复关闭时内部值未还原的问题 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 修复value为空时选择第一项失败的问题 (by [@yawuling](https://github.com/yawuling) )
- PickerView
  - 修复value为空时选择第一项失败的问题 (by [@yawuling](https://github.com/yawuling) )
- Checkbox
  - 修复map功能的样式在不同屏幕尺寸的展示问题 (by [@yawuling](https://github.com/yawuling) )
- Tooltip
  - 修复map功能的样式在不同屏幕尺寸的展示问题 (by [@yawuling](https://github.com/yawuling) )

#### 优化

- Checkbox
  - 优化 button 类型复选框选中样式 (by [@yawuling](https://github.com/yawuling) )
- Doc
  - 文档支持响应式布局 (by [@yawuling](https://github.com/yawuling) )
  - 新增Form表单组合使用文档 (by [@yawuling](https://github.com/yawuling) )
  - 新增搜索功能 (by [@HXCStudio123](https://github.com/HXCStudio123) )

### 1.2.0

*2020-01-06*

#### New features

Picker

- 添加 `before-confirm` 属性

DatetimePicker

- 添加 `before-confirm` 属性

### 1.1.0

*2019-12-31*

#### New features

Sticky
- 新增粘性布局组件

InfiniteLoad
- 新增 `reset` 重置方法，重置加载状态

### 1.0.1

*2019-12-27*

#### Bug fixes

Input
- 修复 show-word-limit 功能 value 为 null 的边界问题

DatetimePicker
- 修复 display-formatter 初始值为空的边界问题

### 1.0.0

*2019-12-26*

- 增加35个组件