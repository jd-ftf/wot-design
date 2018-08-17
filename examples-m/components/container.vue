<template>
  <div class="page">
    <div class="header">
      <jm-navbar :title="$route.meta.pageName">
        <a class="return-back" @click="goBack" slot="left">返回</a>
      </jm-navbar>
    </div>
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.go(-1)
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
