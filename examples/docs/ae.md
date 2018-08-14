---
title: Framework7+Framework7-vue+vue踩坑记（三）
tags:
  - vue
  - framework7
categories:
  - webapp
date: 2017-07-27 10:17:19
---

接上一篇博客“Framework7+Framework7-vue+vue踩坑记（二）”，这里继续 `framework7` + `vue` + `framework7-vue` 踩坑第三波。

<!--more-->

***

###### 1. `Notification`组件

`framework7-vue`没有该组件，使用`framework7`的方式实现，代码如下：

```javascript
this.$f7.addNotification({
  title: 'Framework7',
  message: 'This is a simple notification message with title and message'
})
```

###### 2. `picker`组件

`framework7-vue`没有该组件，使用`framework7`的方式实现，代码如下：

```html
<f7-list form>
  <f7-list-item>
    <f7-input type="text" placeholder="Your iOS device" id="picker-device">
    </f7-input>
  </f7-list-item>
</f7-list>
```

```javascript
<script>
export default {
  mounted () {
    let pickerDevice = this.$f7.picker({
      input: '#picker-device',
      cols: [
        {
          textAlign: 'center',
          values: [
            'iPhone 4',
            'iPhone 4S',
            'iPhone 5',
            'iPhone 5S',
            'iPhone 6',
            'iPhone 6 Plus',
            'iPad 2',
            'iPad Retina',
            'iPad Air',
            'iPad mini',
            'iPad mini2',
            'iPad mini3']
        }
      ]
    })
  }
}
</script>
```

###### 3. 下拉刷新

下拉刷新是在`f7-page`中加上`pull-to-refresh`，以下是代码实现：

```html
<template>
  <f7-page pull-to-refresh @ptr:refresh="onRefresh">
    <f7-navbar title="Pull To Refresh" back-link="Back" slding>
      <f7-nav-right>
        <f7-link icon="icon icon-bars" open-panel="left"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-list media-list>
      <f7-list-item v-for="item in items"
        :media="item.media"
        :title="item.title"
        :subtitle="item.subtitle"
      ></f7-list-item>
      <f7-list-label>
        <p>
          <div>Just pull page down to let the magic happen.</div>
          <div>
            Note that pull-to-refresh feature is optimised for 
            touch and native scrolling so it may not work on 
            desktop browser.
          </div>
        </p>
      </f7-list-label>
    </f7-list>
  </f7-page>
</template>
```

```javascript
<script>
export default {
  data () {
    return {
      items: [
        {
          media: '<img src="./static/image/photo12.jpg" width="44" />',
          title: 'Yellow Submarie',
          subtitle: 'Beatles'
        }, {
          media: '<img src="./static/image/photo13.jpg" width="44" />',
          title: 'Don\'t Stop Me Now',
          subtitle: 'Queen'
        }, {
          media: '<img src="./static/image/photo14.jpg" width="44" />',
          title: 'Billie Jean',
          subtitle: 'Michael Jackson'
        }
      ]
    }
  },
  methods: {
    onRefresh: function () {
      let self = this

      setTimeout(function () {
        let songs = [
          'Yellow Submarine',
          'Don\'t Stop Me Now',
          'Billie Jean',
          'Californication'
        ]
        let authors = [
          'Beatles',
          'Queen',
          'Michael Jackson',
          'Red Hot Chili Peppers'
        ]
        let item = {
          media: '<img src="./static/image/photo' + 
                  Math.floor(Math.random() * 14) +
                 '.jpg" width="44" />',
          title: songs[Math.floor(Math.random() * songs.length)],
          subtitle: authors[Math.floor(Math.random() * authors.length)]
        }

        self.items.unshift(item)

        self.$f7.pullToRefreshDone()
      }, 2000)
    }
  }
}
</script>
```

###### 4. `View`间链接

将在 `left view` 中的链接加载的页面放进 `main view`中，在 `a` 标签上加上 `data-view="###"` （###为css选择器）即可

###### 5. `sortable list`

在`f7-list`的`sortable`属性为`true`时，通过`v-for="item in items"`循环渲染列表，触发`@sortable:sort`事件时，不能对`items`进行操作，`framework7-vue`中`sortable`并没有操作`items`，而是对`Dom树`的操作，而`v-for`是先完成`virtual dom树`的修改再比对修改前的`virtual dom树`，然后对`Dom树`只修改变化的部分，而不是重排，这样会导致`Dom树`的列表又再一次按照我们之前的操作排列一次

###### 6. `f7-swiper`

该组件使用`nested`布局时无法正常显示导航条，使用原生实现，主要是该`vue组件`将`f7-swiper`中的内容全放到`.swiper-wrapper`中，因此就算自定义导航条的`css选择器`也无法正常显示

***

至此，官网的demo已重构完毕，目前发现的需要注意的点就这些。

使用 `framework7-vue` 重构后的项目地址：[vue-framework7](https://github.com/yawuling/vue-framework7)，欢迎star

> 项目初始化时，`framework7` 的参数中，`cache` 设置为 `false` 无效，原因未知。