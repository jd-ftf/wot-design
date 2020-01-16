<template>
  <div>
    <header-layout></header-layout>
    <div class="body-content" :class="isMac ? '' : 'body-scrollbar'">
      <router-view></router-view>
    </div>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
import HeaderLayout from './header'
import ScrollTop from './scrollTop'
import { isMac } from '../utils/index'

export default {
  components: {
    HeaderLayout,
    ScrollTop
  },
  data () {
    return {
      isMac
    }
  }
}
</script>

<style lang="scss">
@import "../assets/style/_variable.scss";

.body-content{
  padding-top: $layout-header-height;
  height: calc(100vh - #{$layout-header-height});
  overflow-y: auto;
}
</style>
