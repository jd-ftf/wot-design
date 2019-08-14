## Steps 标签页

### 按需引入

```javascript
import Vue from 'vue'
import { Step, Steps } from 'jm-design'

Vue.use(Step)
Vue.use(Steps)
```

### 基本用法

`active` 为步骤进度，为 number 类型，步骤的下标。

```html
<jm-steps :active="0">
  <jm-step />
  <jm-step />
  <jm-step />
</jm-steps>
```

### 水平居中

设置 `align-center` 水平居中，只对横向步骤条有效。

```html
<jm-steps :active="1" align-center>
  <jm-step />
  <jm-step />
  <jm-step />
</jm-steps>
```

### 设置标题和描述信息

可以通过 `title` 和 `description` 设置步骤的标题和描述信息。如果不设置标题，则会使用默认的文案。

```html
<jm-steps :active="1" align-center>
  <jm-step title="步骤1" description="注册1个账号" />
  <jm-step title="步骤2" description="登录账号并绑定手机" />
  <jm-step title="步骤3" description="完善个人信息" />
</jm-steps>
```

### 修改图标

可以通过 `icon` 属性设置步骤的图标，传入图标的类名，也可以通过 `icon` 的 slot 插槽自定义图标。

```html
<jm-steps :active="1" align-center>
  <jm-step icon="jm-icon-invite" />
  <jm-step icon="jm-icon-link" />
  <jm-step icon="jm-icon-clock" />
</jm-steps>
```

### 竖向步骤条

设置 `vertical` 属性。

```html
<jm-steps :active="1" vertical>
  <jm-step description="注册1个账号" />
  <jm-step description="登录账号并绑定手机" />
  <jm-step description="完善个人信息" />
</jm-steps>
```

### 点状步骤

设置 `dot` 属性。

```html
<jm-steps :active="1" vertical dot>
  <jm-step description="注册1个账号" />
  <jm-step description="登录账号并绑定手机" />
  <jm-step description="完善个人信息" />
</jm-steps>
```

### 修改状态

设置 `status`，支持 'finished'（完成）、'process'（进行中）、'error'（失败） 三种状态。

```html
<jm-steps :active="1" align-center>
  <jm-step title="绑定手机" status="error" />
  <jm-step title="重新绑定手机" />
  <jm-step title="步骤3" />
</jm-steps>
```

### Steps Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| active | 步骤进度 | number | - | 0 |
| vertical | 垂直方向 | boolean | - | false |
| dot | 点状步骤条 | dot | - | false |
| space | 步骤条间距，默认为自动计算 | string | - | - |
| align-center | 是否水平居中，只对横向步骤条有效 | boolean | - | false |

### Step Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| title | 标题，如果没有则为默认文案。当只有标题而没有描述时，标题的字号会小2号 | string | - | - 
| description | 描述 | string | - | - |
| icon | 图标 | string | - | - |
| status | 步骤状态 | string | 'finished', 'process', 'error' | - |