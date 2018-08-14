<template>
  <div>
    <header-layout></header-layout>
    <div class="body-content">
      <router-view></router-view>
    </div>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
import HeaderLayout from './header'
import ScrollTop from '../components/scrollTop'

export default {
  components: {
    HeaderLayout,
    ScrollTop
  }
}
</script>

<style lang="scss">
@import "../assets/style/_variable.scss";

.body-content{
  padding-top: $layout-header-height;
}
</style>
