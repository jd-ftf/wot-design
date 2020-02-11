## 更新日志

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
- Tooltip
  - 新增组件 (by @HXCStudio123 )
#### Bug 修复
- DatetimePicker
  - 修复关闭时内部值未还原的问题 (by @yawuling )
- Picker
  - 修复value为空时选择第一项失败的问题 (by @yawuling )
- Tabs
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