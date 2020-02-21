## 自定义主题

Wot Design 使用 BEM 格式进行 CSS 类名的定义，大部分的样式只有一层选择器，开发者可以轻松进行样式覆盖。

### 自定义样式

在 Wot Design 的源码中，样式是通过 SCSS 进行编写的，主题色和各个组件的一些样式都是通过 SCSS 变量进行配置，因此，如果要更深层次地进行主题自定义，自己根据 Wot Design 的样式变量定义一套变量文件即可。

#### 主要变量介绍

以下样式变量在多个组件中被使用，通过修改这些主要变量，可以快速定义一套自定义主题。

**主题色**为：

<div class="style-block" style="background: #0083ff;">
  <p>Theme Color</p>
  <p>$-color-theme: #0083ff</p>
</div>

**辅助颜色**，这些颜色在部分组件中会被使用：

<div class="style-block" style="background: #00c740;">
  <p>Success Color</p>
  <p>$-color-success: #00c740</p>
</div>
<div class="style-block" style="background: #ffb300;">
  <p>Warning Color</p>
  <p>$-color-warning: #ffb300</p>
</div>
<div class="style-block" style="background: #e2231a;">
  <p>Danger Color</p>
  <p>$-color-danger: #e2231a</p>
</div>
<div class="style-block" style="background: #909399;">
  <p>Info Color</p>
  <p>$-color-info: #909399</p>
</div>

**还有一些图标、背景、边框颜色**：

<div class="style-block" style="background: #c5c5c5;">
  <p>Icon Color</p>
  <p>$-color-icon: #c5c5c5</p>
</div>
<div class="style-block" style="background: #f4f4f4;">
  <p style="color: #666;">Background Color</p>
  <p style="color: #666;">$-color-bg: #f4f4f4</p>
</div>
<div class="style-block" style="background: #c5c5c5;">
  <p style="color: #666;">Border Color</p>
  <p style="color: #666;">$-color-border: #c5c5c5</p>
</div>
<div class="style-block" style="background: #eee;">
  <p style="color: #666;">Border-light Color</p>
  <p style="color: #666;">$-color-border-light: #eee</p>
</div>

**文字相关变量**：

<table>
  <thead>
    <tr>
      <th>层级</th>
      <th>字体大小</th>
      <th>字号变量</th>
      <th>字体颜色</th>
      <th>字体颜色变量</th>
    </tr>
  </thead>
  <tbody>
    <tr style="font-size: 10px;">
      <td>辅助文字，弱化信息，引导性/不可点文字</td>
      <td>10px</td>
      <td>$-fs-aid</td>
      <td style="color: #d2d2d2;">#d2d2d2</td>
      <td>$-color-aid</td>
    </tr>
    <tr style="font-size: 12px;">
      <td>次要信息，注释/补充/正文</td>
      <td>12px</td>
      <td>$-fs-secondary</td>
      <td style="color: #a7a7a7;">#a7a7a7</td>
      <td>$-color-secondary</td>
    </tr>
    <tr style="font-size: 14px;">
      <td>普通正文</td>
      <td>14px</td>
      <td>$-fs-content</td>
      <td style="color: #666;">#666</td>
      <td>$-color-content</td>
    </tr>
    <tr style="font-size: 16px;">
      <td>标题字号/重要正文字号</td>
      <td>16px</td>
      <td>$-fs-title</td>
      <td style="color: #333;">#333</td>
      <td>$-color-title</td>
    </tr>
  </tbody>
</table>

**左右留白间距**：

$-size-side-padding: 15px;

<div style="position: relative; width: 375px; height: 100px; background: #f4f4f4;">
  <div style="position: absolute; right: -8px; top: 40px;">15px</div>
  <div style="height: 100px; margin: 0 15px; background: rgba(255, 179, 0, 0.55);"></div>
</div>

> 更多样式变量查看 <a href="https://github.com/jd-ftf/wot-design/blob/dev/src/style/abstracts/_variable.scss" target="_blank">配置文件</a>

#### npm 项目中创建 SCSS 变量文件

在自己的项目中创建 SCSS 文件，例如名字命名为 `customStyle.scss` ：

```scss
$-color-theme: #474a4f;

@import "~wot-design/src/style/index.scss";
```

然后在 main.js 中引入：

```javascript
import Vue from 'vue'
import WotDesign from 'wot-design'
import './customStyle.scss'

Vue.use(WotDesign)
```

#### CDN 引入的自定义样式

CDN 引入要自定义样式，目前的方式是将 Wot Design 的项目源码 clone 到本地，开发者手动修改 src/style/abstracts/_variable.scss 文件中的样式变量，然后运行 `npm run build:theme` 命令，将 lib/theme-default/index.css 样式文件放到自己的项目中进行引入

### 按需引入的自定义样式

#### npm 项目中创建 SCSS 变量文件

在自己的项目中创建 SCSS 变量文件，例如名字命名为 `customStyle.scss` ：

```scss
$-color-theme: #474a4f;

/* 只引入自己用到的组件的样式文件 */
@import "~wot-design/src/style/components/button.scss";
```

然后在 main.js 中引入：

```javascript
import Vue from 'vue'
import { Button } from 'wot-design'
import './customStyle.scss'

Vue.use(Button)
```

.babelrc 文件需要将style配置删掉：

```json
{
  "plugins": [
    ["import", {
      "libraryName": "WotDesign",
      "camel2DashComponentName": false
    }]
  ]
}
```

#### CDN 按需引入的自定义样式

CDN 按需引入的自定义样式跟 CDN 引入的自定义样式 的方式一样，也是自己修改源码库，将打包后的文件替换到自己项目中
