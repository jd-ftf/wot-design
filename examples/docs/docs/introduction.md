## 介绍

该组件库根据京麦APP设计规范进行开发，旨在给开发者提供统一的页面风格。

### 快速上手

请查看[快速上手](#/components/quickUse)文档。

### 扫码体验

<img style="width: 150px; height: 150px;" :src="codeImg" />

### 特性

* 30+ 组件
* 支持按需引入
* 支持国际化

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
    QRCode.toDataURL(url, {
      margin: 0
    }).then(url => {
      this.codeImg = url
    })
  }
}
</script>