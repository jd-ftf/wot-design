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
<!-- 默认按钮 -->
<jm-button>登录</jm-button>

<!-- 吸顶按钮 -->
<jm-button type="suck">登录</jm-button>

<!-- 禁用 -->
<jm-button disabled>登录</jm-button>
```

### Arrtibute

| 参数      | 说明                                 | 类型      | 可选值       | 默认值   |
|---------- |------------------------------------ |---------- |------------- |-------- |
| type   |	按钮类型                        |	string     | 'suck'   |	-  |
| disabled	    | 是否禁用                  |	boolean    |	-         |	false |
