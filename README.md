# JM Design

> 基于 Vue 开发的移动端组件库

## 文档地址

在进行开发前请先阅读文档

[文档地址](http://git.jd.com/JM-FE/jm-design/wikis/home)

## Build Setup

``` bash
# 安装依赖
npm install

# 运行开发环境
npm run dev

# 打包插件库
npm run build

# 打包文档和移动端demo
npm run build:docs

# 打包插件库并分析包大小
npm run build --report

# 运行单元测试
npm run unit

# 运行e2e（端对端）测试
npm run e2e

# 运行所有的测试
npm test

# 辅助命令：打包组件库总入口
npm run build:lib

# 辅助命令：打包组件库各组件入口
npm run build:comp

# 辅助命令：将组件库的scss样式文件引入为一个index.scss文件入口，用于开发者自定义主题
npm run build:theme
```

## 使用的技术栈

Vue + SCSS

## 构建工具

webpack

## 代码规范约束

- JS 规范约束: ESLint Standard 标准
- CSS 规范约束: BEM 规范