<template>
  <a v-show="showTop" class="scroll-top" @click="gotoTop" ref="scrollTop">
    <i class="iconfont icon-top"></i>
  </a>
</template>

<script>
export default {
  data () {
    return {
      showTop: false
    }
  },
  methods: {
    gotoTop () {
      window.scrollTo(0, 0)
    },
    scrollTopListener (e) {
      this.showTop = document.documentElement.scrollTop > 100
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollTopListener)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollTopListener)
  }
}
</script>

<style lang="scss">
@import "../assets/style/variable.scss";

.scroll-top {
  position: fixed;
  display: inline-block;
  right: 60px;
  bottom: 100px;
  display: inline-block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-shadow: 0 0 10px #dfdfdf;
  text-align: center;
  line-height: 44px;
  cursor: pointer;

  &:hover {
    .iconfont {
      color: $color-theme-l3;
    }
  }
  .iconfont {
    font-size: 24px;
    color: #7f7f7f;
  }
}
</style>
