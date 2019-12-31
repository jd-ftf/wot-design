<template>
  <div class="page-sticky">
    <div class="page-sticky-space">基本用法，可以设置 offset-top 距离顶部距离，这里为 44，因为头部导航高度为 44</div>
    <sticky :offset-top="44">
      <p class="page-sticky-title">这是第一个标题</p>
    </sticky>
    <div class="page-sticky-space">设置 offset-top 为 100</div>
    <sticky :offset-top="100">
      <p class="page-sticky-title">这是第二个标题</p>
    </sticky>
    <div class="page-sticky-space">设置容器 container</div>
    <div class="page-sticky-container" ref="container1">
      <sticky :offset-top="150" :container="container1">
        <p class="page-sticky-title">这是第三个标题</p>
      </sticky>
    </div>
    <div class="page-sticky-container" ref="container2">
      <sticky :offset-top="150" :container="container2">
        <p class="page-sticky-title">这是第四个标题</p>
      </sticky>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      container1: '',
      container2: ''
    }
  },
  mounted () {
    this.container1 = this.$refs.container1
    this.container2 = this.$refs.container2
  }
}
</script>

<style lang="scss">
.page-sticky {
  position: relative;
  min-height: 200vh;
}
.page-sticky-space {
  padding: 0 15px;
  margin: 10px 0;
  color: #666;
}
.page-sticky-title {
  margin: 0;
  padding: 10px 15px;
  background: #fff;
  color: #0083ff;
  font-size: 14px;
}
.page-sticky-container {
  min-height: 200px;
  background: #eee;
}
</style>