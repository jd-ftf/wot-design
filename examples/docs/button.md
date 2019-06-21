## Button 按钮

### 使用

#### 按需引入

```javascript
import Vue from 'vue'
import { Button } from 'jm-design'

Vue.use(Button)
```

#### 示例

```html
<!-- 基本按钮 -->
<jm-button>默认按钮</jm-button>
<jm-button type="primary">主要按钮</jm-button>
<jm-button type="success">成功按钮</jm-button>
<jm-button type="info">信息按钮</jm-button>
<jm-button type="warning">警告按钮</jm-button>
<jm-button type="error">危险按钮</jm-button>

<!-- 设置 disabled -->
<jm-button disabled>默认按钮</jm-button>

<!-- 设置幽灵按钮：plain -->
<jm-button type="primary" plain>主要按钮</jm-button>

<!-- 设置圆角按钮：round -->
<jm-button type="primary" round>主要按钮</jm-button>

<!-- 设置按钮大小：size，默认为 'medium' 大小 -->
<jm-button type="primary" size="small">小号按钮</jm-button>
<jm-button type="primary" size="medium">中号按钮</jm-button>
<jm-button type="primary" size="large">大号按钮</jm-button>

<!-- 设置加载中状态：loading -->
<jm-button type="primary" loading>加载中</jm-button>

<!-- 设置文字按钮，将 type 设置 为 text -->
<jm-button type="text">文字按钮</jm-button>

<!-- 设置图标按钮，将 type 设置 为 icon，并设置 icon 属性 -->
<jm-button type="icon" icon="jm-icon-menu"></jm-button>

<!-- 设置带图标的基本按钮，设置 icon 属性 -->
<jm-button type="primary" icon="jm-icon-edit-outline"></jm-button>

<!-- 设置吸顶按钮：suck -->
<jm-button type="primary" suck>加载中</jm-button>

<!-- 设置块状按钮：block -->
<jm-button type="primary" block>加载中</jm-button>
```

### Arrtibute

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
