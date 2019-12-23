<template>
  <div class="page">
    <div class="header" :class="{ 'is-no-fixed': $route.meta.headerNoFix }">
      <wd-navbar :title="$route.meta.pageName" light>
        <a class="return-back" slot="left" @click="goBack">
          <wd-icon name="arrow-left" />
        </a>
      </wd-navbar>
    </div>
    <div class="page-content" :class="{ 'is-no-fixed': $route.meta.headerNoFix }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.back()
    }
  }
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
    display: block;
    height: 100%;
    line-height: 44px;
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
