## 自定义主题

JMDesign 使用 BEM 格式进行 CSS 类名的定义，大部分的样式只有一层选择器，开发者可以轻松进行样式覆盖。

### 自定义样式

在 JMDesign 的源码中，样式是通过 SCSS 进行编写的，主题色和各个组件的一些样式都是通过 SCSS 变量进行配置，因此，如果要更深层次地进行主题自定义，自己根据 JMDesign 的样式变量定义一套变量文件即可。

#### npm 项目中创建 SCSS 变量文件

在自己的项目中创建 SCSS 文件，例如名字命名为 `customStyle.scss` ：

```scss
$-color-theme: #474a4f;

@import "~@jd/jm-design/src/style/index.scss";
```

然后在 main.js 中引入：

```javascript
import Vue from 'vue'
import JMDesign from 'jm-design'
import './customStyle.scss'

Vue.use(JMDesign)
```

#### CDN 引入的自定义样式

CDN 引入要自定义样式，目前的方式是将 JMDesign 的项目源码 clone 到本地，开发者手动修改 src/style/abstracts/_variable.scss 文件中的样式变量，然后运行 `npm run build` 命令，将 lib/theme-default/index.css 样式文件放到自己的项目中进行引入

### 按需引入的自定义样式

#### npm 项目中创建 SCSS 变量文件

在自己的项目中创建 SCSS 变量文件，例如名字命名为 `customStyle.scss` ：

```scss
$-color-theme: #474a4f;

/* 只引入自己用到的组件的样式文件 */
@import "~jm-design/src/style/components/button.scss";
```

然后在 main.js 中引入：

```javascript
import Vue from 'vue'
import { Button } from 'jm-design'
import './customStyle.scss'

Vue.use(Button)
```

.babelrc 文件需要将style配置删掉：

```json
{
  "plugins": [
    ["import", {
      "libraryName": "JMDesign",
      "camel2DashComponentName": false
    }]
  ]
}
```

#### CDN 按需引入的自定义样式

CDN 按需引入的自定义样式跟 CDN 引入的自定义样式 的方式一样，也是自己修改源码库，将打包后的文件替换到自己项目中