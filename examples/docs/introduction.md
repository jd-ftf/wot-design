## 介绍

该组件库根据京麦APP设计规范进行开发，旨在给开发者提供统一的页面风格。

::: error
！！！尚未写单元测试用例，尚未添加国际化支持，尚未提交测试测各手机兼容性和功能，目前还不可使用。
:::

### 快速上手

请查看[快速上手](#/components/quickUse)文档。

### 扫码体验

<img style="width: 150px; height: 150px;" :src="codeImg" />

### 开源协议

本项目遵循 MIT 协议。

<script>
import QRCode from 'qrcode'

export default {
  data () {
    return {
      codeImg: ''
    }
  },
  mounted () {
    let path = location.pathname.slice(0, location.pathname.lastIndexOf('/'))
    let url = `${location.protocol}//${location.host}${path}/examples.html`
    console.log(url)
    QRCode.toDataURL(url, {
      margin: 0
    }).then(url => {
      this.codeImg = url
    })
  }
}
</script>