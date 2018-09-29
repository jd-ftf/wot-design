<template>
  <div class="page">
    <div class="header">
      <jm-navbar :title="$route.meta.pageName">
        <router-link class="return-back" to="/" slot="left">返回</router-link>
      </jm-navbar>
    </div>
    <div class="page-content">
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
    display: block;
    width: 40px;
    height: 100%;
    color: #fff;
  }
}
.page-content {
  padding-top: 44px;
}
</style>
