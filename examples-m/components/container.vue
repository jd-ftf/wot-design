<template>
  <div class="page">
    <div class="header" :class="{ 'is-no-fixed': $route.meta.headerNoFix }">
      <jm-navbar :title="$route.meta.pageName" light>
        <router-link class="return-back" to="/" slot="left">
          <jm-icon name="arrow-left" />
          <span>返回</span>
        </router-link>
      </jm-navbar>
    </div>
    <div class="page-content" :class="{ 'is-no-fixed': $route.meta.headerNoFix }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;

  .return-back {
    width: 40px;
    height: 100%;
    vertical-align: middle;

    span, i {
      vertical-align: middle;
    }
  }
  &.is-no-fixed {
    position: relative;
  }
}
.page-content {
  padding-top: 44px;

  &.is-no-fixed {
    padding-top: 0;
  }
}
</style>
