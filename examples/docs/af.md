---
title: 前端技术就我目前已知的汇总
date: 2017-09-11 18:40:55
tags: 前端杂谈
---

目前前端的技术很多，范围也很广，在这篇博客就我目前所知道的前端技术做个汇总，有些我也还没看过，在这里不会细谈，这篇博客会持续更新下去

<!--more-->

> 这里把分成前端和后端（Node），如果有什么地方讲的不对，欢迎指教，谢谢

#### 一、前端

---

##### 1、ECMAScript

* *[ECMAScript](http://es6.ruanyifeng.com/#docs/intro)* : JavaScript 的标准，目前已发布到 ECMAScript 2017 了（这三年一年发布一个版本，除了 ES6 更新幅度很大，后面的两个版本都只是新增了部分语法或语法糖），文档是阮一峰老师写的[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/#docs/intro)，讲的很详细，持续更新中，另外 Babel 这里给的 [文档](http://babeljs.cn/docs/learn-es2015/) 比较简短，适合查询用

##### 2、Babel，让你使用下一代 JavaScript 标准

* *[Babel](http://babeljs.io/)* : 由于 ECMAScript 的新语法有些在浏览器上还没有被实现，所以 Babel 诞生了，它可以让你使用最新的 JavaScript 标准，并帮你自动将其转换为 ES5

##### 3、JavaScript 转译语言

* *[CoffeeScript](http://coffee-script.org/)* : 一门编译到 JavaScript 的小巧语言
* *[TypeScript](https://www.tslang.cn/)* : 微软开发的一种编程语言，是 JavaScript 的一个超集，扩展了 JavaScript 的语法

##### 4、强大的构建工具

> 如果你还在自己手动地重复检查，合并，压缩，格式化文件，刷新浏览器这些枯燥的工作，那么你可以来尝试一下构建工具（选择自己喜欢的就好）

* *[rollup](https://rollupjs.org/)* : 中文文档 [点击这里](https://rollupjs.org/zh)

* *[Grunt](https://gruntjs.com/)* : 中文文档 [点击这里](http://www.gruntjs.net/)

* *[Gulp](https://gulpjs.com/)* : 中文文档 [点击这里](http://www.gulpjs.com.cn/)

* *[webpack](https://webpack.js.org/)* : 中文文档 [点击这里](https://webpack-china.org/)

* *[Browserify](http://browserify.org/)*

##### 5、*[ESlint](http://eslint.cn/)* JS代码检测

> ESlint 定义了一套代码风格的规则，使用它可以让你的代码更具有可读性，适用于团队合作，以下是目前比较流行的两套 ESlint 标准

* *[standard style](https://standardjs.com/)*

* *[Airbnb JavaScript Style Guide](http://airbnb.io/javascript/)*

##### 6、stylelint，CSS 代码检测

* *[stylelint](https://stylelint.io/)* : 一个强大的现代 CSS 检测器，可以让你在样式表中遵循一致的约定和避免错误，中文文档 [点击这里](http://stylelint.cn/)

##### 7、不可缺少的测试

> 一个项目，一个工具，一个插件，如果你不做测试，那么其稳定性无法保证

* *[karma](http://karma-runner.github.io/1.0/index.html)* : 测试管理工具

* *[mocha](http://mochajs.org/)* : 单元测试框架，可跟 karma 结合

* *[jasmine](https://jasmine.github.io/)* : 单元测试框架，可跟 karma 结合

* *[Nightwatch](http://nightwatchjs.org/)* : 端对端测试框架，模拟用户行为的测试

* *[CasperJS](http://casperjs.org/)* : 端对端测试框架，基于 PhantomJS

* *[Protractor](http://www.protractortest.org/#/)* : AngularJS 的端对端测试框架

##### 8、优秀的 JavaScript 代码库 —— jQuery && Zepto

* *[jQuery](http://api.jquery.com/)* : 提供了一系列方便的 API ，包含选择器，Dom 处理，JS 动画，事件处理等，兼容性好。个人喜欢使用这个 [文档](http://jquery.cuishifeng.cn/) ，一个 jQuery 速查表

* *[Zepto](http://www.zeptojs.cn/)* : Zepto 是一个更轻量级的代码库，保留了 jQuery 的大部分 api 名字，同时对移动端做了适配，适合用于移动端开发

##### 9、Web框架

> 这几个框架中我目前就用到了 Vue，React 正在学习，其他的尚未使用，这里我会对 Vue 的篇幅多一点，抱歉，若有什么讲的不对的，请帮忙指正

* *[Vue](https://cn.vuejs.org/)* : 尤雨溪大大开发的一个轻量的 MVVM 框架，目前在国内很火，很多大厂也开始用 Vue 重构项目了
  
  > Vue 社区 : https://www.vue-js.com/ ，可在这里寻找开源项目练手
  > Github上面基于 Vue 的项目 : https://github.com/vuejs/awesome-vue

  + Vue 全家桶

    + [Vue-Router](https://router.vuejs.org/zh-cn/) : Vue 官方路由插件
    + [Vuex](https://vuex.vuejs.org/zh-cn/) : Vue 官方状态管理插件
    + [axios](https://www.npmjs.com/package/axios) : Vue 官方推荐 HTTP 客户端

  + 基于 Vue 的 UI 组件库

    + [Mint-UI](http://mint-ui.github.io/#!/zh-cn) : 饿了么开源的一个适用于移动端的 UI 组件库，样式简洁
    + [Muse-UI](http://www.muse-ui.org/) : 一款运用了 Google 的 Material Design 设计理念的UI组件库
    + [Vue-Material](http://vue-material.com/#/) : 一款运用了 Google 的 Material Design 设计理念的UI组件库
    + [Vux](https://vux.li/#/) : 基于微信开源的 WeUI 进行开发的一套 Vue 组件库，封装好了微信的 jssdk，很适合开发用于微信的移动端网页
    + [Element UI](http://element.eleme.io/#/) : 饿了么开源的 Vue 组件库，比较适合用于 PC 端网页的开发

    > 除了以上所列出的组件库，还有其他不少优秀的组件库，这里不再陈列了

* *[React](https://facebook.github.io/react/)* : Facebook 开源的一款用于 UI 的 JS 库，社区很活跃，语法不多（相比较于 Vue），性能出众，代码逻辑非常简单（套用阮一峰老师的话），中文文档 [点击这里](https://doc.react-china.org/)

* *[Angular](https://angularjs.org/)* : Google 开发的一个 MVVM 框架，曾经的 AngualarJS 1.0 其 watcher 越多会导致项目越慢，它使用了脏检查循环。你会发现 Vue 的一些语法跟 Angular 很像，因为 Angular 是 Vue 早期开发的灵感来源。现在 AngularJS 已经升级到2.0了，代码优化了不少，性能也改进了

> 以上框架的对比，详细查看 https://cn.vuejs.org/v2/guide/comparison.html ，至于选择哪种框架看个人喜好，没有什么最好的，只有最适合自己的

* *[CycleJS](https://cycle.js.org/)* : 一个函数式和响应式的 JavaScript 框架，编写可观测代码

##### 10、CSS 预处理器，提高你工作效率的好工具
> css 预处理器的思想是用一种专门的编程语言来编写样式表，之后再将其编译成 css 文件

* *[Sass / Scss](http://sass-lang.com/)* : 基于 Ruby 编译，Scss 是Sass 3 引入的新的语法，兼容 CSS3，并继承了 Sass 的功能，Scss 语法对 CSS 友好，目前说 Sass，基本用的是 Scss 语法，插件也基本都是面向 Scss 的。编译的时候得安装 Ruby，或者使用 [koala](http://koala-app.com/index-zh.html) 这个工具，如果你是使用 webpack 等打包工具的话，有对应的插件可以使用，VSCode 等编辑器也有对应的插件。中文文档 [点击这里](https://sass-guidelin.es/zh/)

* *[Less](http://lesscss.org/)* : 基于 Node 编译的预处理器，语法没 Sass 那么多，但用起来也比较舒服，看个人喜欢了。

* *[Stylus](http://www.zhangxinxu.com/jq/stylus/)* : 基于 Node 编译的 CSS 预处理器，语法很强大，语法点多，写法有多种，很自由，在我制作 Hexo 博客主题的时候使用了其部分语法，刚学的时候可能无法驾驭住

> 以上预处理器各有优缺点，至于选择哪一种，同样的没有最好的，只有最适合自己的

##### 11、Web APP
> 运行于移动端网页上，具备移动 APP 的部分特点，即使用网页实现的 APP，但不具备调用所有手机底层 API 的能力（曾经我有段时间将 web app 理解成了 Hybrid APP），以下介绍部分能用于开发 Web APP 的框架，部分使用过的框架会篇幅多一点

* *Vue + Vue-router + Vuex + axios( + UI组件库)* : Vue 的官方插件 Vue-router 可以实现路由跳转，Vuex可以用于存储登录状态等，axios 获取数据，再加上UI组件库可以帮你方便地构建出一款Web APP，Vue 的`transition`标签可以实现路由跳转动画。这里使用了前后端分离的思想，了解前后端分离，请走传送门：[前后端分离](https://www.itcodemonkey.com/article/140.html)。登录状态安全性请去了解`Token`机制和 Web本地存储（本地存储下面会简单介绍一下）

* *[jQuery mobile](http://jquerymobile.com/)* : jQuery 框架的一个组件

* *[Frozen UI](http://frozenui.github.io/)* : 一个开源的简单易用，轻量快捷的移动端UI框架。基于手Q样式规范，选取最常用的组件，做成手Q公用离线包减少请求，升级方式友好，文档完善，目前全面应用在腾讯手Q增值业务中（官方原话）

* *[ionic](http://ionicframework.com/docs/)* : 基于 Sass 和 Angular 的一个开源组件库，官方文档需要翻墙访问，可以阅读中文文档 [点击这里](http://www.ionic.wang/js_doc-index.html)

* *[Amaze UI](http://amazeui.org/getting-started?_ver=2.x)* : 一个轻量级的用于移动端的框架

* *[Framework7](http://framework7.io/docs/)* : 淘宝开源的一个移动端组件库，分 iOS 样式和 Android 样式，它的理念是致力于打造接近原生的体验，实现了 iOS 的侧滑返回功能，所以很逼近 iOS 原生体验，它构建了一个轻量的 jQuery 语法框架，并基于其进行开发。该框架同时有适配 Vue 的 Framework7-Vue 和适配 React 的 Framework7-React，关于 Framework7-Vue，我用它重构了 Framework7 官网的 Demo，Github 的地址在这：[vue-framework7](https://github.com/yawuling/vue-framework7)，并对其遇到的一些问题写了几篇博客，请走 [传送门](http://blog.ywulin.com/tags/framework7/)
（Framework7 的文档分了好几个域名展示，每个文档的更新程度不一致，以上所展示的地址是一直保持着最新内容，其他链接目前没有更新了）

> Web APP 的框架很多，你可以自己去搜索，以上就只列了部分而已

##### 12、Hybrid APP
> Hybrid APP ，译为混合 APP，即部分地方采用原生，部分地方使用 Web APP，现在有很多 APP 都采用这种开发模式，Web APP可以一套代码适用 iOS 和 Android 双平台，所以开发周期快，比如手Q就是这种开发模式，上面陈列的 Web APP 在外面包个壳就可以打包成 APP 了

* *[Cordova](http://cordova.apache.org/)* : 一个 Web APP 打包工具，是 Phonegap 捐赠给 Apache 后使用的项目名，它给 Web 提供了一个 Web 容器供其运行，官方提供了调用手机底层 API 插件，能实现多端打包，此外还有不少用户开发封装的第三方插件，以上提及的 Web APP 框架基本可用该工具打包成 APP

* *Angular + ionic + Phonegap* : 目前比较流行的 Hybrid APP 开发技术选型，ionic 提供了很多方便好用的功能

* *Vue + Framework7-Vue + Cordova* : Vue 的 Hybrid APP 之路比较短，目前没有常见的技术选型，以上是我实践过后的技术选型，在 iOS 上可以达到以假乱真的程度，在 Android 上的话还需要加上 [crosswork](https://crosswalk-project.org/) 这个工具，才不至于太卡，另外转场动画可能会比较单一（Vue 的 transition 在使用手机的返回时会重新执行一遍动画）

* *[H5+](http://www.html5plus.org/doc/zh_cn/accelerometer.html) + [MUI](http://dev.dcloud.net.cn/mui/)* :  H5+ 是 DCloud 提出的一套标准，它可以让我们使用 JS 调用手机底层40万 API，API 使用起来简单，MUI 是官方配套的一套组件库，配合官方编辑器 HBuilder 可以很方便地进行远程打包安装。2017年3月份我使用的时候它的社区还不是很完善，按照其他人的评价就是社区大多是张口问问题，但分享的却很少，现在不知道怎么样（这里我自觉惭愧，我也曾经当过其中的一员，后面项目结束后想着把遇到的问题的解决方案分享出来的，拖着拖着就已经把内容忘了）。总结起来就是用法很简单，但部分技术问题没有提供解决措施。

##### 13、使用前端技术来构建原生 APP
> 以下都需要具备一定的原生知识

* *[React Native](https://facebook.github.io/react-native/)* : 按照我的理解，React Native 是使用 React 的写法去调用原生组件，只不过 React 是调用 HTML 标签，虽然说 React Native 可以用一套代码实现 iOS 和 Android 双端，但大多数时候还是得写两套代码。曾经 React Native 最大的优势是热更新（热更新这里自己去查，我没用过，也不怎么了解），不过目前已被苹果给禁了，基于 React Native 的项目依旧可以过审。React Native 社区是目前最活跃的，很多坑也已经被踩平了，可以放心用。

* *[Weex，又叫 Vue Native](http://weex.apache.org/)* : 阿里开源的一个基于 Vue 语法的框架，一套代码使用于 PC，APP，Web 三端，2017年发布的，目前文档还在完善中，社区还不活跃，Vue 的开发者尤雨溪大大参与了该项目，并发布了一个用 weex 开发的 APP

* *[NativeScript](https://www.nativescript.org/)* : 国外开发者自行发起的一个开源项目，所以没有大厂做靠背，它的理念是使用 JavaScript 构建原生，其定义了一系列标签，用于同时适配 iOS 和 Android，所以构建出来的项目就是原生，不过目前标签还不完善，部分组件还未实现，它跟 Angular 和 Vue 不冲突，目前已有人实现了 NativeScript 和 Angular 和 Vue 的结合

##### 14、前端也能圆桌面程序梦

* *[Electron](https://electron.atom.io/)* : Github 开源的一个打包工具，Atom 和 VSCode 都是用这个工具开发的，他可以将你编写的 Web 打包成三端（Windows，Mac，Linux）的安装程序。该工具使用了 Chrome V8 引擎用于渲染界面，本身提供了一些 API，同时我们也可以使用 Node 的 API。该工具有与 Vue 结合使用的初始化模块和文档，UI 框架可以选用 Element UI。中文文档 [点击这里](https://electron.org.cn/)

##### 15、前后端分离的数据模拟

* *[MockJS](http://mockjs.com/)* : 前后端分离的开发模式，前端与后端先约定好数据格式和 API，在后端 API 还没封装好时，我们可以使用 MockJS 生成随机数据进行开发，提高工作效率

##### 16、JS 模块规范
> 在 ES6 还没出来之前，JS 在浏览器方面没有模块规范（后端 Node 有 CommonJS 标准），以下是目前浏览器端的两个模块规范

* *[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)* : 异步模块定义

* *CMD* : 大名远扬的玉伯提出的规范，并根据其标准写了个 [sea.js](http://yslove.net/seajs/) （CMD找不到官方文档）

* *ES6* : ES6 标准提供了模块的定义，使用`export`导出模块的内容，使用`import`引入想要使用的模块

##### 17、浏览器本地存储

* *localstorage* : 没有时间限制的数据存储，一般浏览器支持的是 5M 大小，以键值对的形式存储

* *sessionstorage* : 针对一个 session 的数据存储，只存在于当前会话，页面关闭或者浏览器关闭即消失

* *cookie* : 有时间限制的数据存储

* *webSQL* : 本地关系型数据库，目前已不再更新，浏览器一般支持 5M

* *indexDB* : 本地非关系型数据库，浏览器一般支持 5M

##### 18、微信小程序

* *[微信小程序](https://mp.weixin.qq.com/debug/wxadoc/dev/)* : 基于微信的程序，语法有点像 Vue

##### 19、PWA

* *[PWA](https://developers.google.com/web/progressive-web-apps/)* : 谷歌和百度联合推出的一门技术，能使你的 Web APP 表现得就像是 native mobile APP （官方文档需要翻墙，这里可以访问简书作者 "短衣匹马" 的[译文](http://www.jianshu.com/p/4e9d14fcb9de)）

#### 二、后端 Node

---

> Node 是后端的领域了，目前我了解的不多，暂时没有余力去成为全栈工程师，以下简单地罗列我所了解的

##### 1、Node

* *[Node](https://nodejs.org/dist/latest-v8.x/docs/api/)* : 使用 JavaScript 作为开发语言，并对其进行扩展，前端工程师能够快速入手，中文文档 [点击这里](http://nodejs.cn/api/)

##### 2、NPM

* *[NPM](https://www.npmjs.com/)* : Node 的包管理工具，由于 NPM 的仓库是架设在国外服务器上的，在国内下载速度慢，可以使用淘宝搭建的仓库，它实时保持着与官方仓库的一致，淘宝提供的包管理工具`cnpm`，安装依赖包的时候使用`cnpm`，构建项目的时候还是使用`npm`

##### 3、CommonJS 规范

* *CommonJS* ： 是 Node 提出的 JS 模块规范，使用`export`导出模块的内容，使用`require`引入想要使用的模块

##### 4、Web 后台框架

* *[express](http://www.expressjs.com.cn/4x/api.html)* : 其针对 Node 的 http 模块封装了一系列 API，将底层实现好了，它让我们不再需要自己去实现底层逻辑，只需要专注于业务的实现，express 同时也提供了 https 请求机制

* *[koa](http://koa.bootcss.com/)* : express 原班人马打造，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。使用 koa 编写 Web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。（取自koa中文文档）

##### 5、模板引擎
> node 作为后端，返回给浏览器的是静态文件，它没有 Java 的 jsp 服务器页面，所以就有了模板引擎，通过 node 提供的 文件操作 api 读取文件的内容，然后将数据替换到对应的位置，模板引擎也可用于客户端开发，以下只罗列几个，更多的模板引擎请自行搜索

* *[Jade](http://jade-lang.com/)* 

* *[Mustache](http://mustache.github.io/)*

* *[EJS](http://www.embeddedjs.com/)*

##### 6、数据库
> 数据库我目前就了解 MongoDB 而已，以下也只列这一个

* *[MongoDB](http://www.runoob.com/mongodb/mongodb-tutorial.html)* : 一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库（来自菜鸟教程）

---

前端路漫漫，离全栈工程师还有一段路要走