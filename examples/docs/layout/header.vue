<template>
  <header class="header">
    <div class="header-container">
      <router-link :to="{ path: '/' }" class="logo-block">
        <i class="jm-design-logo"></i>
        <span>JM Design</span>
      </router-link>
      <ul class="header-tab">
        <li class="header-tab__item" v-for="(page, key) in pages" :key="key">
          <a v-if="page.href" :href="page.href" class="header-tab__link" target="_blank">{{ page.name }}</a>
          <router-link
            v-else
            class="header-tab__link"
            active-class="header-tab__link--active"
            :to="`/${key}`"
          >{{ page.name }}</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import pagesConfig from '../pages.config.json'

export default {
  data () {
    return {
      pages: pagesConfig
    }
  }
}
</script>

<style lang="scss">
/**
 * 布局文件 header 的样式
 */
@import '../assets/style/variable';

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #eee;
  background: $color-bg;
  z-index: 100;
}
.header-container {
  margin: 0 120px;
  height: $layout-header-height;
  line-height: $layout-header-height;
}
.logo-block {
  display: inline-block;
  height: $layout-header-height;
  line-height: $layout-header-height;
  vertical-align: top;
  font-size: 18px;
  color: $color-theme;

  span {
    vertical-align: middle;
  }
}
.jm-design-logo {
  display: inline-block;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  background: url('../assets/img/jm-design.png') no-repeat;
  background-size: cover;
  vertical-align: middle;
}
.header-tab {
  float: right;
}
.header-tab__item {
  display: inline-block;
}
.header-tab__link {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  font-size: $fs-title;
  line-height: 25px;
  color: $color-text-light;

  &:hover {
    color: $color-important;
  }
}
.header-tab__link--active{
  color: $color-theme;

  &:hover {
    color: $color-theme;
  }
  &::after {
    position: absolute;
    content: '';
    width: 70%;
    height: 2px;
    left: 15%;
    bottom: 0;
    background: $color-theme;
  }
}
</style>
