## 常见问题FAQ

本节介绍在 H5 开发过程当中遇到的部分 **常见问题** 以及 **解决办法**

### 底部安全区域适配(iphone X 类型的机型)

部分弹窗类型的组件，对于 iphone X 类型的机型支持设置 `safe-area-inset-bottom` 属性来开启底部安全区域（大部分组件已默认开启），这要求开发者同时在 html 文件中设置以下代码：

```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
```

左图为未开启底部安全区域，右侧为开启底部安全区域效果。

![底部安全区域](https://img11.360buyimg.com/ftfman/jfs/t1/159578/15/18888/80839/6075a3d1Eb7321202/b08d5ee9ad2de6a4.jpg)

### 关于我们

**如果您的问题不在上述列表中或您有更好的建议，请联系我们 [ftf@jd.com](mailto:ftf@jd.com)**
