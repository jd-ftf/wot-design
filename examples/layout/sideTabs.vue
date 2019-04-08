<template>
  <div>
    <side-bar parentKey="components"></side-bar>
    <div class="tab-content">
      <div class="content-flex" ref="demoBlock">
        <div class="jm-markdown">
          <router-view></router-view>
          <page-controller></page-controller>
        </div>
        <div class="demo-iframe" v-show="$route.meta.demo" ref="phone" :style="phoneStyle">
          <iframe frameborder="0" :src="`/examples#${$route.meta.demo}`" style="height: 640px"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './sidebar'
import PageController from './pageController'

export default {
  data () {
    return {
      phoneStyle: {
        position: 'absolute',
        right: '0',
        top: '0'
      }
    }
  },
  components: {
    SideBar,
    PageController
  },
  methods: {
    phoneListener () {
      let phoneHeight = this.$refs.phone.clientHeight

      if (this.$refs.demoBlock.clientHeight > phoneHeight) {
        let demoBlockRect = this.$refs.demoBlock.getBoundingClientRect()

        if (demoBlockRect.top - 60 < 0 && demoBlockRect.bottom - 60 > phoneHeight) {
          this.phoneStyle = {
            position: 'fixed',
            right: '120px',
            top: '60px'
          }
        } else if (demoBlockRect.top - 60 > 0) {
          this.phoneStyle = {
            position: 'absolute',
            right: '0',
            top: '0'
          }
        } else if (demoBlockRect.bottom - 60 < phoneHeight) {
          this.phoneStyle = {
            position: 'absolute',
            right: '0',
            bottom: '0'
          }
        }
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.phoneListener)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.phoneListener)
  }
}
</script>

<style lang="scss">
.tab-content{
  margin: 0 120px 100px 360px;

  .content-flex {
    position: relative;
  }
  .jm-markdown {
    margin-right: 380px;
  }
  .markdown-content {
    min-height: 600px;
  }
  .demo-iframe {
    width: 360px;
    margin-left: 20px;
    margin-top: 20px;
    box-shadow: 0 0 4px #aaa;
    font-size: 0;
    border-radius: 8px;

    iframe {
      width: 100%;
      border-radius: 8px;
    }
  }
}
</style>
