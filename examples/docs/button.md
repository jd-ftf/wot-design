## Button 按钮

### 按需引入

```javascript
import Vue from 'vue'
import { Button } from 'jm-design'

Vue.use(Button)
```

### 基本用法

基本按钮。

```html
<jm-button>默认按钮</jm-button>
<jm-button type="primary">主要按钮</jm-button>
<jm-button type="success">成功按钮</jm-button>
<jm-button type="info">信息按钮</jm-button>
<jm-button type="warning">警告按钮</jm-button>
<jm-button type="error">危险按钮</jm-button>
```

### 禁用

设置 `disabled` 属性。

```html
<jm-button disabled>默认按钮</jm-button>
```

### 幽灵按钮

设置 `plain` 属性。

```html
<jm-button type="primary" plain>主要按钮</jm-button>
```

### 圆角按钮

设置 `round` 属性。

```html
<jm-button type="primary" round>主要按钮</jm-button>
```

### 按钮大小

设置 `size` ，支持 'small'、'medium'、'large'，默认为 'medium'。

```html
<jm-button type="primary" size="small">小号按钮</jm-button>
<jm-button type="primary" size="medium">中号按钮</jm-button>
<jm-button type="primary" size="large">大号按钮</jm-button>
```

### 加载中按钮

设置 `loading` 属性，让按钮处于加载中状态。加载中的按钮是禁止点击的。

```html
<jm-button type="primary" loading>加载中</jm-button>
```

### 文字按钮

将 `type` 设置为 `text`。文字按钮不支持其他颜色。

```html
<jm-button type="text">文字按钮</jm-button>
```

### 图标按钮

将 `type` 设置为 `icon`，同时设置 `icon` 属性，icon为图标的类名，可以直接使用 `Icon 图标` 章节中的图标类名。

```html
<jm-button type="icon" icon="jm-icon-menu"></jm-button>
```

### 带图标的按钮

设置 `icon` 属性，不需要设置 `type` 为 `icon`，即可以直接使用带图标的按钮。

```html
<jm-button type="primary" icon="jm-icon-edit-outline"></jm-button>
```

### 吸顶按钮

设置 `suck` 属性。

```html
<jm-button type="primary" suck>主要按钮</jm-button>
```

### 块状按钮

设置 `block` 属性。

```html
<jm-button type="primary" block>加载中</jm-button>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type   |	按钮类型                        |	string     | 'primary', 'success', 'info', 'warning', 'error', 'text', 'icon' |	-  |
| round	    | 圆角按钮                  |	boolean    |	-         |	false |
| plain | 幽灵按钮 | boolean | - | false |
| loading | 加载中按钮 | boolean | - | false |
| suck | 吸顶按钮 | boolean | - | false |
| block | 块状按钮 | boolean | - | false |
| size | 按钮尺寸 | string | 'small', 'medium', 'large' | 'medium' |
| disabled | 禁用按钮 | boolean | - | false |
| icon | 图标类名 | string | - | - |
| nativeType | 原生type属性 | string | - | 'button' |
