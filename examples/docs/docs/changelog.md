## 更新日志

### 2.4.1

*2021-07-01*

#### Bug 修复

- Tabs
  - 修复在 `display: none` 的结构中，获取不到宽度的问题 (by [@yawuling](https://github.com/yawuling) )

### 2.4.0

*2021-06-30*

#### 新特性

- InputNumber
  - 新增增加、减小按钮的点击事件 (by [@MrJiangLei](https://github.com/MrJiangLei) )
- Toast
  - 新增 `type` 提示类型属性，弃用 `iconName` 属性 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `onClose` 关闭回调属性 (by [@yawuling](https://github.com/yawuling) )

#### Bug 修复

- MessageBox
  - 修复 `confirmButtonText`、`cancelButtonText`、`lockScroll` 属性未重置的问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复 `teleport` 属性的文档位置，该属性只能对组件调用方式有效 (by [@yawuling](https://github.com/yawuling) )
- SelectPicker
  - 修复 `type` 为 'radio'，搜索时未正确高亮搜索文本的问题 (by [@yawuling](https://github.com/yawuling) )
- Sticky
  - 修复组件名定义错误的问题 (by [@tclyjy](https://github.com/tclyjy) )
- Tabs
  - 修复在不同宽度容器下无法正确获取宽度的问题 (by [@tclyjy](https://github.com/tclyjy) )
- Upload
  - 使用 before-upload 钩子时，选择一张图片后，不让通过，再次选择同一张图片未触发 [#315](https://github.com/jd-ftf/wot-design/issues/315)  (by [@HXCStudio123](https://github.com/HXCStudio123) )

### 2.3.2

*2021-05-08*

#### Bug 修复

- DatetimePicker
  - 修复 `value` 在组件挂载后二次赋值无效的问题 (by [@yawuling](https://github.com/yawuling) )
  - 补全日期范围类型下的国际化 (by [@yawuling](https://github.com/yawuling) )

### 2.3.1

*2021-04-22*

#### Bug 修复

- ImgCropper
  - 修复二次选择图片时图片尺寸不匹配的问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复 `img-width` 和 `img-height` 属性设置 `number` 类型时无效的问题 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 修复国际化文案异常问题 (by [@HXCStudio123](https://github.com/HXCStudio123) )

### 2.3.0

*2021-04-21*

#### 新特性

- ActionSheet
  - 新增 `close-on-popstate` 属性，返回时自动关闭 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
- Calendar
  - 新增日历选择器组件 (by [@yawuling](https://github.com/yawuling) )
- CalendarView
  - 新增日历面板组件 (by [@yawuling](https://github.com/yawuling) )
- ColPicker
  - 新增 `close-on-popstate` 属性，返回时自动关闭 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `ellipsis` 属性，设置是否超出隐藏，默认 `false` (by [@yawuling](https://github.com/yawuling) )
- Curtain
  - 新增 `close-on-popstate` 属性，返回时自动关闭 (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - 新增 `close-on-popstate` 属性，返回时自动关闭 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `default-value` 属性，支持设置默认选中项 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `ellipsis` 属性，设置是否超出隐藏，默认 `false` (by [@yawuling](https://github.com/yawuling) )
- DropMenu
  - 新增 `close-on-popstate` 属性，返回时自动关闭 (by [@yawuling](https://github.com/yawuling) )
- InputNumber
  - 新增 `allow-null` 属性允许空值 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `placeholder` 属性设置占位文本 (by [@yawuling](https://github.com/yawuling) )
- ImgPreview
  - 支持设置 previewKey 来修改 Vue.prototype 原型上的 $preview 属性名 (by [@yawuling](https://github.com/yawuling) )
- ImgCropper
  - 新增图片裁剪组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- MessageBox
  - 新增 `close-on-popstate` 属性，返回时自动关闭 (by [@yawuling](https://github.com/yawuling) )
  - 支持设置 messageBoxKey 来修改 Vue.prototype 原型上的 $messageBox 属性名 (by [@yawuling](https://github.com/yawuling) )
- NumberKeyboard
  - 新增数字键盘组件 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 新增 `close-on-popstate` 属性，返回时自动关闭 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `ellipsis` 属性，设置是否超出隐藏，默认 `false` (by [@yawuling](https://github.com/yawuling) )
- Popup
  - 新增 `close-on-popstate` 属性，返回时自动关闭 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
- Search
  - 新增 `type` 属性，支持设置 'number' 输入类型 (by [@yawuling](https://github.com/yawuling) )
- SelectPicker
  - 新增 `close-on-popstate` 属性，返回时自动关闭 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `safe-area-inset-bottom` 属性，设置底部安全距离 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `filterable` 和 `filter-placeholder` 属性，支持本地搜索 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `ellipsis` 属性，设置是否超出隐藏，默认 `false` (by [@yawuling](https://github.com/yawuling) )
- Switch
  - 新增 `before-change` 修改前钩子函数  (by [@yawuling](https://github.com/yawuling) )
- Toast
  - 支持设置 toastKey 来修改 Vue.prototype 原型上的 $toast 属性名 (by [@yawuling](https://github.com/yawuling) )
- Upload
  - 新增 `show-preview-list` 控制上传成功后是否展示预览列表  (by [@HXCStudio123](https://github.com/HXCStudio123) )

#### 优化

- Card
  - 优化卡片组件的样式结构 (by [@yawuling](https://github.com/yawuling) )
- PickerView
  - 优化 `columns` 修改时的选中项重置逻辑，如果 `value`、`label` 相同则不重置选项 (by [@yawuling](https://github.com/yawuling) )
- 边框
  - Button、Card、Divider、Grid、InputNumber、Popover、Steps、Switch 边框调整为 0.5 像素 (by [@yawuling](https://github.com/yawuling) )

#### Bug 修复

- ColPicker
  - 修复 value 重新赋值时需重置选项的问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复 `cancel` 事件无效的问题 (by [@yawuling](https://github.com/yawuling) )
- MessageBox
  - 修复在部分手机上的兼容性问题 (by [@yawuling](https://github.com/yawuling) )
- PickerView
  - 修复选项长度过长时换行的问题 (by [@yawuling](https://github.com/yawuling) )
- Popover
  - 修复插槽宽度较小时，弹出层的箭头样式偏移错乱问题 (by [@yawuling](https://github.com/yawuling) )
  - 修正 `offset` 属性的使用 (by [@yawuling](https://github.com/yawuling) )
- Search
  - 修复clear事件晚于blur事件触发 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Tabbar
  - 修复使用 `name` 属性设置无法高亮的问题 (by [@yawuling](https://github.com/yawuling) )
- Tooltip
  - 修复插槽宽度较小时，弹出层的箭头样式偏移错乱问题 (by [@yawuling](https://github.com/yawuling) )
  - 修正 `offset` 属性的使用 (by [@yawuling](https://github.com/yawuling) )
- Upload
  - 修复 `disabled` 状态下可以删除图片的问题 (by [@yawuling](https://github.com/yawuling) )

#### 本次更新可能影响范围

- Card 的样式实现发生变动，如果您有覆盖 Card 组件的样式，则可能会影响到您的页面
- ColPicker、DatetimePicker、Picker、SelectPicker 原先值为超出默认隐藏，显示为省略号，本次调整为默认不隐藏，若需隐藏，需手动设置 `ellipsis` 属性

### 2.2.1

*2020-12-25*

#### Bug 修复

- DatetimePicker
  - 修复范围选择时tab的列表样式未重置的问题 (by [@yawuling](https://github.com/yawuling) )
- InfiniteLoad
  - 修复滚动容器顶部有margin时无法触发滚动加载事件的问题 (by [@yawuling](https://github.com/yawuling) )
- MessageBox
  - 修复直接使用 messageBox(options) 时 type 类型没有设置初始配置的问题 (by [@yawuling](https://github.com/yawuling) )
- PickerView
  - 修复value为null时，无法自动设置value为第一项的问题 (by [@yawuling](https://github.com/yawuling) )
- Popover
  - 修复属性 placement 为 top/right 系列位置时，arrow样式位置失效问题  (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Search
  - 修复样式超出右侧边界问题 (by [@yawuling](https://github.com/yawuling) )
- Tabbar
  - 去掉 `to` 属性为外链时的下划线样式 (by [@yawuling](https://github.com/yawuling) )
- Tabs
  - 修复导航地图中按钮的居中问题 (by [@yawuling](https://github.com/yawuling) )

### 2.2.0

*2020-12-10*

#### 新特性

- ActionSheet
  - 新增 `teleport` 属性，可以手动设置挂载点，默认挂载到 body 上 (by [@yawuling](https://github.com/yawuling) )
- ColPicker
  - 新增 `close-on-click-modal` 属性 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `auto-complete` 属性，自动触发 `column-change` 补全列表初始数据 (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - 新增 `teleport` 属性，可以手动设置挂载点，默认挂载到 body 上 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `close-on-click-modal` 属性 (by [@yawuling](https://github.com/yawuling) )
- DropMenu
  - 新增 `value-key` 属性，支持自定义 options 中数据结构的 value 字段 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `label-key` 属性，支持自定义 options 中数据结构的 label 字段 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `tip-key` 属性，支持自定义 options 中数据结构的 value 字段 (by [@yawuling](https://github.com/yawuling) )
- MessageBox
  - 新增 `teleport` 属性，可以手动设置挂载点，默认挂载到 body 上 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 新增 `teleport` 属性，可以手动设置挂载点，默认挂载到 body 上 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `close-on-click-modal` 属性 (by [@yawuling](https://github.com/yawuling) )
- Popup
  - 新增 `teleport` 属性，可以手动设置挂载点，默认挂载到 body 上 (by [@yawuling](https://github.com/yawuling) )
- SelectPicker
  - 新增 `teleport` 属性，可以手动设置挂载点，默认挂载到 body 上 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `close-on-click-modal` 属性 (by [@yawuling](https://github.com/yawuling) )
- SortButton
  - 新增 `line` 属性 (by [@yawuling](https://github.com/yawuling) )
- Upload
  - 新增 `name` 属性，支持自定义上传文件字段名 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `data` 属性，支持上传时附带额外参数 (by [@yawuling](https://github.com/yawuling) )
  - 新增 `name-key` 和 `status-key`，支持自定义 file 数据结构中的 name 字段和 status 字段 (by [@yawuling](https://github.com/yawuling) )

#### 优化

- ActionSheet
  - 给列表添加最大高度限制，为选项过多的情况做展示兜底 (by [@yawuling](https://github.com/yawuling) )
- Cell
  - 将右侧value值的字号从12px调整为14px (by [@yawuling](https://github.com/yawuling) )
- CheckBox
  - `true-value` 和 `false-value` 支持空字符串 (by [@yawuling](https://github.com/yawuling) )
  - 图标添加 line-height 避免被外部样式干扰导致错位 (by [@yawuling](https://github.com/yawuling) )
- ColPicker
  - 修改 loading 类型 (by [@yawuling](https://github.com/yawuling) )
- ImgPreview
  - `open`、`long-tap` 事件添加 `index` 参数回调 (by [@yawuling](https://github.com/yawuling) )
- Input
  - `min`, `max` 属性删除，在移动端无效，建议用 `InputNumber` (by [@yawuling](https://github.com/yawuling) )
- Loading
  - 去掉1.0中的 loading 类型，并做好向下兼容 (by [@yawuling](https://github.com/yawuling) )
- Picker
  - 去掉 取消 和 完成 按钮的点击态 (by [@yawuling](https://github.com/yawuling) )
- Radio
  - 优化 dot 类型的动画 (by [@yawuling](https://github.com/yawuling) )
  - 图标添加 line-height 避免被外部样式干扰导致错位 (by [@yawuling](https://github.com/yawuling) )
- Rate
  - `active-color` 支持数组，支持设置两种颜色 (by [@awjing](https://github.com/awjing) )
- StatusTip
  - 更新占位图，清晰部分细节 (by [@yawuling](https://github.com/yawuling) )
- Sticky
  - 优化实现，去掉 `container` 属性，改为自动获取 (by [@yawuling](https://github.com/yawuling) )
- Upload
  - 添加国际化支持 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 上传进度取整展示 (by [@yawuling](https://github.com/yawuling) )
  - 上传失败不展示文件名 (by [@yawuling](https://github.com/yawuling) )
  - 修正事件传递和参数传递 (by [@yawuling](https://github.com/yawuling) )
- Locale
  - 添加 泰文 th-TH (by [@yawuling](https://github.com/yawuling) )
  - 优化 英文 en-US (by [@yawuling](https://github.com/yawuling) )

#### Bug 修复

- ActionSheet
  - 将 button 标签替换为 div，避免触发 form 标签的提交操作 (by [@yawuling](https://github.com/yawuling) )
  - 修复 `close-on-click-modal` 的使用 (by [@yawuling](https://github.com/yawuling) )
- Collapse
  - 修正 `line-num` 字段名 (by [@yawuling](https://github.com/yawuling) )
  - 将展开收起设置为行内块 (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - 修复 CDN 引用方式内存溢出问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复时间范围类型 value 的数值初始化bug (by [@yawuling](https://github.com/yawuling) )
  - 修复 `value` 为 undefined 时的取值异常 (by [@yawuling](https://github.com/yawuling) )
- ImgPreview
  - 按需引入 $preview 函数名称修正 (by [@yawuling](https://github.com/yawuling) )
  - 按需引入找不到组件 Bug 修复 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- MessageBox
  - 按需引入找不到组件 Bug 修复 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Picker
  - 将 button 标签替换为 div，避免触发 form 标签的提交操作 (by [@yawuling](https://github.com/yawuling) )
  - 修正设置 `arrow-html` 属性，回显没有按照 html 渲染的问题 (by [@yawuling](https://github.com/yawuling) )
  - 修复未选择取消后再次进入选中为数组格式 (by [@yawuling](https://github.com/yawuling) )
- PickerView
  - 去掉 ul 默认样式 (by [@yawuling](https://github.com/yawuling) )
- PullRefresh
  - 按需引入找不到组件 Bug 修复 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Rate
  - 去掉 ul 默认样式 (by [@yawuling](https://github.com/yawuling) )
- Search
  - 修复垂直居中问题 (by [@yawuling](https://github.com/yawuling) )
- Tabs
  - 将 button 标签替换为 div，避免触发 form 标签的提交操作 (by [@yawuling](https://github.com/yawuling) )
  - 修改 `change` 和 `click` 触发时机 (by [@yawuling](https://github.com/yawuling) )
- Upload
  - 修复上传时文件没有携带上去的问题 (by [@yawuling](https://github.com/yawuling) )

### 2.1.0

*2020-09-30*

#### 新特性

- Input
  - 新增属性 `align-right`, 支持设置内容右对齐 [#210](https://github.com/jd-ftf/wot-design/issues/210)  (by [@HXCStudio123](https://github.com/HXCStudio123) )

#### 优化

#### Bug 修复

- Input
  - 文档里面的demo对齐（rows）改成string  [#211](https://github.com/jd-ftf/wot-design/issues/211) (by [@HXCStudio123](https://github.com/HXCStudio123) )

### 2.0.0

*2020-09-25*

#### 新特性

- 综合
  - 组件样式升级，主题色更改
  - 重绘了全部图标，并新增了部分图标
- ActionSheet
  - 新增属性 `panels` 自定义面板，支持一维数组和二维数组，panel数据结构支持设置显示的图片地址和标题内容 (by [@awjing](https://github.com/awjing) )
- Badge
  - 新增属性 `top` 为正时表示角标向下偏移对应的像素 (by [@awjing](https://github.com/awjing) )
  - 新增属性 `right` 为正时表示角标向左偏移对应的像素 (by [@awjing](https://github.com/awjing) )
- Button
  - click 事件抛出event对象 (by [@yawuling](https://github.com/yawuling) )
  - type 默认值改为 `primary` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - round 默认值改为 `true` (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Card
  - 新增卡片组件 Card  (by [@awjing](https://github.com/awjing) )
- Cell
  - 新增属性 `required`, 支持表单属性设置必填项 (by [@yawuling](https://github.com/yawuling) )
  - 新增属性 `vertical`, 支持表单属性展示为上下结构 (by [@yawuling](https://github.com/yawuling) )
- CellGroup
  - 新增属性 `border`, 支持设置表单组是否展示边框线 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- CheckboxGroup
  - 新增属性 `cell`, 支持复选框组下的表单模式事件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `size`，支持单选框尺寸更改（large） (by [@yawuling](https://github.com/yawuling) )
- ColPicker
  - 新增 ColPicker 多列选择组件 (by [@yawuling](https://github.com/yawuling) )
- Curtain
  - 新增 Curtain 幕帘组件 (by [@RedJoy](https://github.com/RedJoy) )
- Divider
  - 新增 Divider 分割线组件 (by [@yawuling](https://github.com/yawuling) )
- DatetimePicker
  - 属性 `value` 添加 `Array` 格式，用来支持时间范围选择。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `columns-height`, 支持设置 picker 内部的单个 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `required`, 支持表单属性设置必填项 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增默认插槽，可更改默认唤起 picker 的形式（默认为cell）。(by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 将 pickerView 交互形式更改为滚筒交互。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `loading-color`, 支持修改加载的颜色 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 展开弹出框事件名称由 `showPicker` 改为 `open`。(by [@yawuling](https://github.com/yawuling) )
  - 新增方法 `close`, 支持关闭弹出框 (by [@yawuling](https://github.com/yawuling) )
  - 新增方法 `toggle`, 在区域选择模式下，tab标签切换时触发 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `display-format-tab-label`, 在区域选择模式下，自定义展示tab标签文案的格式化函数，返回一个字符串 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- DatetimePickerView
  - 新增属性 `columns-height`, 支持设置 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `column-formatter`, 支持自定义处理列项数组，接收 pickerView 实例、pickerView 源数组 originColumns、pickerView 每个属性的范围 ranges、当前 pickerView 的 value 作为入参，根据选中项和边界范围进行判断，通过 pickerView 实例暴露出来的 getPickerValue 获取对数据进行数组转换 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 将 pickerView 交互形式更改为滚筒交互。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `loading-color`, 支持修改加载的颜色 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- DropMenu
  - 重构下拉菜单组件，优化其体验性及扩展性，自定义菜单选项功能移除原来的插槽 `custom`，采用组件外部flex布局添加新菜单选项 (by [@yawuling](https://github.com/yawuling) )
  - 移除属性 `active-color` (by [@yawuling](https://github.com/yawuling) )
  - 将组件 `DropMenuItem` 中的属性 `modal` 移至 `DropMenu` 控制是否展示蒙层 (by [@yawuling](https://github.com/yawuling) )
  - 将组件 `DropMenuItem` 中的属性 `close-on-click-modal` 移至 `DropMenu`  控制是否点击蒙层时关闭 (by [@yawuling](https://github.com/yawuling) )
- DropMenuItem
  - 移除插槽 `menu` (by [@yawuling](https://github.com/yawuling) )
  - 新增插槽 `default`  (by [@yawuling](https://github.com/yawuling) )
  - 新增插槽 `title`  (by [@yawuling](https://github.com/yawuling) )
- Grid
  - 新增属性 `bg-color`, 支持宫格设置背景颜色 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- ImgPreview
  - 新增 图片预览 组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Input
  - 新增属性 `no-border`, 支持设置取消底部边框 (by [@yawuling](https://github.com/yawuling) )
  - 新增属性 `required`, 支持表单属性设置必填项 (by [@yawuling](https://github.com/yawuling) )
  - 新增事件 `click-prefix-icon`, 点击前置图标时触发 (by [@yawuling](https://github.com/yawuling) )
  - 新增事件 `click-suffix-icon`, 点击后置图标时触发 (by [@yawuling](https://github.com/yawuling) )
- Loading
  - 属性 `type` 新增类型 `circle-outline` loading样式 和 `circular-ring` loading 样式 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Navbar
  - 新增默认插槽，可更改标题处展示样式。(by [@HXCStudio123](https://github.com/HXCStudio123) )
- NoticeBar
  - 新增属性 `type`， 新增默认插槽，支持设置通知栏类型。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 属性 `left-icon` 更名为 `prefix`。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 插槽 `left-icon` 更名为 `prefix`。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 插槽 `right-icon` 更名为 `suffix`。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Pagination
  - 新增分页组件 Pagination (by [@wlin00](https://github.com/wlin00) )
- Picker
  - 新增属性 `columns-height`, 支持设置 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `required`, 支持表单属性设置必填项 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 将 pickerView 交互形式更改为滚筒交互。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增默认插槽，可更改默认唤起 picker 的形式（默认为cell）。(by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `loading-color`, 支持修改加载的颜色 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 展开弹出框事件名称由 `showPicker` 改为 `open`。（(by [@yawuling](https://github.com/yawuling) )
  - 新增方法 `close`, 支持关闭弹出框 (by [@yawuling](https://github.com/yawuling) )
- PickerView
  - 新增属性 `columns-height`, 支持设置 pickerView 高 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `item-height` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `visible-item-count` (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 将 pickerView 交互形式更改为滚筒交互。 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `loading-color`, 支持修改加载的颜色 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Progress
  - 新增属性 `status` 设置进度条状态，支持sucess和danger (by [@awjing](https://github.com/awjing) )
- Popover
  - 新增组件 `Popover` (by [@HXCStudio123](https://github.com/HXCStudio123) )
- PullRefresh
  - 新增插槽 `tip` (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Radio
  - 新增属性 `max-width`, 支持设置文字部分最大宽度，设置最大宽度开启文字折叠 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 属性 `type` 新增可选值 `check`，默认值变更为 `check` (by [@HXCStudio123](https://github.com/HXCStudio123) )
- RadioGroup
  - 新增属性 `cell`, 支持单选组下的表单模式事件 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `size`, 支持单选框尺寸更改（large） (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 属性 `type` 新增可选值 `check`，默认值变更为 `check` (by [@HXCStudio123](https://github.com/HXCStudio123) )
- SelectPicker
  - 新增组件 SelectPicker 。 (by [@HXCStudio123](https://github.com/HXCStudio123))
- SortButton
  - 排序按钮组件重构，移除控制颜色的属性 `color` / `title-color` (by [@yawuling](https://github.com/yawuling) )
  - 交互形式默认改为 点击排序后只保留一个当前状态箭头，移除属性 `one-arrow` (by [@yawuling](https://github.com/yawuling) )
  - 新增属性 `desc-first`  优先切换为降序，不开启则默认优先切换为升序 (by [@yawuling](https://github.com/yawuling) )
- Tabbar（TabbarItem）
  - 新增属性 `active-icon` 选中图标的类名 (by [@awjing](https://github.com/awjing) )
  - 新增属性 `top` 为正时表示角标向下偏移对应的像素 (by [@awjing](https://github.com/awjing) )
  - 新增属性 `right` 为正时表示角标向左偏移对应的像素 (by [@awjing](https://github.com/awjing) )
- Tabs
  - 移除属性 `color` (by [@awjing](https://github.com/awjing) )
  - 移除属性 `inactive-color` (by [@awjing](https://github.com/awjing) )
  - 移除属性 `line-width` (by [@awjing](https://github.com/awjing) )
  - 移除属性 `line-height` (by [@awjing](https://github.com/awjing) )
- Tag
  - 移除属性 `size` (by [@awjing](https://github.com/awjing) )
  - 新增属性 `mark` 标记类型 (by [@awjing](https://github.com/awjing) )
  - 新增属性 `round` 圆角类型 (by [@awjing](https://github.com/awjing) )
- Toast
  - 新增属性 `iconSize`， 支持修改左侧图标尺寸 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增属性 `loadingColor` ，支持设置加载指示器颜色 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 新增方法 `info` ，支持展示常规Toast样式 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Tooltip
  - 新增属性 `show-close`， 支持设置显示 Tooltip 内部右侧的关闭按钮 (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `effect` ，文字提示 2.0 起 不再支持主题设置，将主题白色样式迁移至组件[Popover](/#/components/popover) (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除属性 `mode` ，文字提示 2.0 起 不再支持模式设置，将模式设置迁移至组件[Popover](/#/components/popover) (by [@HXCStudio123](https://github.com/HXCStudio123) )
  - 移除事件 `menu-click` 该事件已迁移至组件[Popover](/#/components/popover) (by [@HXCStudio123](https://github.com/HXCStudio123) )
- Upload
  - 新增 Upload 上传组件 (by [@HXCStudio123](https://github.com/HXCStudio123) )

#### 优化

- Grid
  - 支持动态渲染GridItem （by [@HXCStudio123](https://github.com/HXCStudio123) ）
  - 支持列项修改后内部GridItem重排 （by [@HXCStudio123](https://github.com/HXCStudio123) ）
  - GridItem 内容padding移除，兼容小屏幕展示四字标题 （by [@HXCStudio123](https://github.com/HXCStudio123) ）
- InputNumber
  - 属性 `min` 支持动态修改后重置值 （by [@HXCStudio123](https://github.com/HXCStudio123) ）
  - 属性 `max` 支持动态修改后重置值 （by [@HXCStudio123](https://github.com/HXCStudio123) ）
- LazyLoad
  - 图片懒加载兜底图优化 (by [@yawuling](https://github.com/yawuling) )
- MessageBox
  - 动画时间由300ms改为200ms，减少等待时间 (by [@yawuling](https://github.com/yawuling) )
- Navbar
  - 优化深色背景的颜色 (by [@yawuling](https://github.com/yawuling) )
- Status Tip
  - 属性 `type` 下的七种类型 对应缺省展示图片更改。 (by [@awjing](https://github.com/awjing))

#### Bug 修复

- Checkbox
  - 修复复选框组禁用模式下，单项禁用失效问题 (by [@HXCStudio123](https://github.com/HXCStudio123) )
- PickerView
  - 修复columns延迟传入时无法自动选中第一项的问题；修复columns延迟传入时picker重置数据的记录 (by [@yawuling](https://github.com/yawuling) )
- Popup
  - 修复按需引入popup和messageBox缺少modal样式问题 (by [@yawuling](https://github.com/yawuling) )
- StatusTip
  - 去掉占位图的白色背景，将图片从base64改为图片链接以减少包大小 (by [@yawuling](https://github.com/yawuling) )
- Cell
  - 修复边框线样式calc计算无效问题 (by [@yawuling](https://github.com/yawuling) )
- InfiniteLoad
  - 修复finished和error后还反复触发 loadmore 事件 (by [@yawuling](https://github.com/yawuling) )
- Search
  - 修复搜索框点清空按钮，placeholder 未居左的问题 (by [@yawuling](https://github.com/yawuling) )
- Tabs
  - 修复 sticky 按需引入无样式问题 (by [@yawuling](https://github.com/yawuling) )
- 按需引入
  - 修复按需引入下部分组件缺少样式的问题 (by [@yawuling](https://github.com/yawuling) )

### 2.0.0-beta3

该版本为测试版，推荐使用2.0 正式版

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