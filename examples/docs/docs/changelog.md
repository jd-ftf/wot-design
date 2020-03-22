## 更新日志

### 1.4.1

*2020-03-22*

#### Bug 修复

- 修复新组件入口文件未引入注册问题

#### 优化

- Doc
  - 修复 DropMenu 文档组件名错误问题
  - 修复 Tabs 文档组件名错误问题
- Demo
  - 修复 DropMenu demo 的展示

### 1.4.0

*2020-03-13*

#### 新特性

- Col
  - 新增组件 (by @HXCStudio123 )
- DropMenu
  - 新增组件 (by @HXCStudio123 )
- Grid
  - 新增组件 (by @HXCStudio123 )
- Img
  - 新增组件 (by @houtianfu )
- Row
  - 新增组件 (by @HXCStudio123 )
- SortButton
  - 新增组件 (by @Gkxie )
- StatusTip
  - 新增组件 (by @Ren Jing )

#### Bug 修复

- Cell
  - 修复标签包裹问题 (by @yawuling )
- Checkbox
  - 修正单个复选框下的change事件触发和入参 (by @yawuling )
- Picker
  - 修复多级联动，修改内部值后取消恢复数据源； (by @yawuling )
  - 修复 column-change 异步情况下无法准确获取值的问题 (by @yawuling )
- PickerView
  - 修复columns为空数组情况下的内存溢出 (by @yawuling )
- Slider
  - 修正slider样式 (by @yawuling )
- Search
  - 高度问题修复 (by @HXCStudio123 )

#### 优化

- Doc
  - 自定义主题 (by @yawuling )
  - 新增Col/Row组合使用Layout文档 (by @HXCStudio123 )

### 1.3.0

*2020-02-11*

#### 新特性

- Cell
  - 新增属性`size`, `title-width`, `center`, `replace` (by @yawuling )
- Checkbox
  - 新增属性`inline` (by @yawuling )
- DatetimePicker
  - 新增属性`size`, `label-width`, `error`, `align-right` (by @yawuling )
  - 添加与 CellGroup 组件的关联 (by @yawuling )
- Input
  - 新增属性`label`, `label-width`, `size`, `error`, `center` (by @yawuling )
  - 新增插槽`label` (by @yawuling )
  - 添加与 CellGroup 组件的关联 (by @yawuling )
- Picker
  - 新增属性`size`, `label-width`, `error`, `align-right` (by @yawuling )
  - 添加与 CellGroup 组件的关联 (by @yawuling )
- Radio
  - 新增属性`inline` (by @yawuling )
- SwipeAction
  - 新增组件 (by @Gkxie )
- Tag
  - 新增属性`dynamic`，支持新增标签操作 (by @awjing )

#### Bug 修复

- Search
  - 修复关闭时内部值未还原的问题 (by @yawuling )
- Picker
  - 修复value为空时选择第一项失败的问题 (by @yawuling )
- PickerView
  - 修复value为空时选择第一项失败的问题 (by @yawuling )
- Checkbox
  - 修复map功能的样式在不同屏幕尺寸的展示问题 (by @yawuling )
- Tooltip
  - 修复map功能的样式在不同屏幕尺寸的展示问题 (by @yawuling )

#### 优化

- Checkbox
  - 优化 button 类型复选框选中样式 (by @yawuling )
- Doc
  - 文档支持响应式布局 (by @yawuling )
  - 新增Form表单组合使用文档 (by @yawuling )
  - 新增搜索功能 (by @HXCStudio123 )

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