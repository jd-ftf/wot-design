<template>
  <div class="page-sticky">
    <div class="page-sticky-space">基本用法，顶部距离默认设置44，避开顶部导航</div>
    <wd-sticky :offset-top="44">
      <div class="page-sticky-pad">
        <wd-button type="success">基本用法</wd-button>
      </div>
    </wd-sticky>
    <div class="page-sticky-space">吸顶距离，设置100距离</div>
    <wd-sticky :offset-top="100">
      <div class="page-sticky-pad" style="text-align: center;">
        <wd-button>吸顶距离</wd-button>
      </div>
    </wd-sticky>
    <div class="page-sticky-space">相对容器，容器是自动相对于父元素，跟 position: sticky 计算一致</div>
    <div class="page-sticky-container">
      <wd-sticky :offset-top="44">
        <div class="page-sticky-pad" style="text-align: right;">
          <wd-button type="warning">sticky</wd-button>
        </div>
      </wd-sticky>
    </div>
    <div class="page-sticky-space">相对容器+相对顶部距离</div>
    <div class="page-sticky-container">
      <wd-sticky :offset-top="150">
        <div class="page-sticky-pad">
          <wd-button type="warning">sticky</wd-button>
        </div>
      </wd-sticky>
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
.page-sticky-pad {
  padding: 0 15px;
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
  background: #fff;
}
</style>