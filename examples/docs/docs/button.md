## Button 按钮

### 按需引入

```javascript
import Vue from 'vue'
import { Button } from 'wot-design'

Vue.use(Button)
```

### 基本用法

基本按钮。

```html
<wd-button>主要按钮</wd-button>
<wd-button type="success">成功按钮</wd-button>
<wd-button type="info">信息按钮</wd-button>
<wd-button type="warning">警告按钮</wd-button>
<wd-button type="error">危险按钮</wd-button>
```

### 禁用

设置 `disabled` 属性。

```html
<wd-button disabled>默认按钮</wd-button>
```

### 幽灵按钮

设置 `plain` 属性。

```html
<wd-button plain>主要按钮</wd-button>
```

### 按钮大小

设置 `size` ，支持 'small'、'medium'、'large'，默认为 'medium'。

```html
<wd-button size="small">小号按钮</wd-button>
<wd-button size="medium">中号按钮</wd-button>
<wd-button size="large">大号按钮</wd-button>
```

### 加载中按钮

设置 `loading` 属性，让按钮处于加载中状态。加载中的按钮是禁止点击的。

```html
<wd-button loading>加载中</wd-button>
```

### 文字按钮

将 `type` 设置为 `text`。文字按钮不支持其他颜色。

```html
<wd-button type="text">文字按钮</wd-button>
```

### 图标按钮

将 `type` 设置为 `icon`，同时设置 `icon` 属性，icon为图标的类名，可以直接使用 `Icon 图标` 章节中的图标类名。

```html
<wd-button type="icon" icon="wd-icon-menu"></wd-button>
```

### 带图标的按钮

设置 `icon` 属性，不需要设置 `type` 为 `icon`，即可以直接使用带图标的按钮。

```html
<wd-button icon="wd-icon-edit-outline"></wd-button>
```

### 块状按钮

设置 `block` 属性。

```html
<wd-button block>加载中</wd-button>
```

### Attributes

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type   |	按钮类型                        |	string     | 'primary', 'success', 'info', 'warning', 'error', 'text', 'icon' |	'primary'  |
| round	    | 圆角按钮                  |	boolean    |	-         |	true |
| plain | 幽灵按钮 | boolean | - | false |
| loading | 加载中按钮 | boolean | - | false |
| suck | 吸顶按钮 | boolean | - | false |
| block | 块状按钮 | boolean | - | false |
| size | 按钮尺寸 | string | 'small', 'medium', 'large' | 'medium' |
| disabled | 禁用按钮 | boolean | - | false |
| icon | 图标类名 | string | - | - |
| nativeType | 原生type属性 | string | - | 'button' |
