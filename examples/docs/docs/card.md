## Card 卡片

### 按需引入

```javascript
import Vue from 'vue'
import { Card } from 'wot-design'

Vue.use(Card)
```

### 基本使用

通过插槽 `action` 可以插入操作按钮。

```html
<wd-card title="经营分析">
  一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。
  <wd-button slot="action" size="small" type="primary" plain round>查看详情</wd-button>
</wd-card>
```

### 矩形卡片

将`type` 设置为 `rectangle` 。
通过插槽 `title` 可以插入标题。

```html
<wd-card type="rectangle">
  <div class="title" slot="title">
    <div>服务到期</div>
    <div class="title-tip"><wd-icon name="warning" size="14px" style="vertical-align: bottom"/> 您可以去电脑上使用该服务</div>
  </div>
  <div style="height: 40px;" class="content">
    <img src="../assets/img/joy.png" width="40" height="40" alt="joy" style="border-radius: 4px; margin-right: 12px;" />
    <div>
      <div style="color: rgba(0,0,0,0.85); font-size: 16px;">智云好客CRM短信_催评营销</div>
      <div style="color: rgba(0,0,0,0.25); font-size: 12px;">高级版-快速吸粉 | 周期一年 </div>
    </div>
  </div>
  <div slot="action">
    <wd-button size="small" round style="margin-right: 8px;">评价</wd-button>
    <wd-button size="small" type="primary" plain round>立即使用</wd-button>
  </div>
</wd-card>
```
```style
.content, .title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.content {
  justify-content: flex-start;
}
.title {
  justify-content: space-between;
}
.title-tip {
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}
```

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| title        | 卡片标题          | string  |          —            |    —    |
| type        | 卡片类型          | string  |          'rectangle'            |    —    |

### Slot

| name      | 说明       |
|------------- |----------- |
| default | 卡片内容 |
| title | 标题 |
| action | 操作内容 |
