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
          <div class="phone-header">
            <img class="phone-title" src="../assets/img/phtitle.png" />
            <input readonly v-model="demoLink" class="phone-link" />
          </div>
          <iframe frameborder="0" :src="demoLink" style="height: 597px" ref="iframe"></iframe>
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
  computed: {
    demoLink () {
      let path = location.pathname.slice(0, location.pathname.lastIndexOf('/'))
      return location.protocol + '//' + location.host + (process.env.NODE_ENV === 'dev'
        ? `/demo#${this.$route.meta.demo}`
        : `${path}/demo.html#${this.$route.meta.demo}`)
    }
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
  },
  beforeRouteUpdate (to, from, next) {
    this.$refs.iframe.contentWindow.scrollTo(0, 0)
    next()
  }
}
</script>

<style lang="scss">
.tab-content{
  margin: 0 120px 100px 375px;

  .content-flex {
    position: relative;
  }
  .jm-markdown {
    margin-right: 395px;
  }
  .markdown-content {
    min-height: 600px;
  }
  .phone-header {
    padding: 10px 10px 12px 10px;
    background: #545456;
  }
  .phone-title {
    width: 100%;
  }
  .phone-link {
    margin-top: 10px;
    width: 100%;
    padding: 0 6px;
    height: 28px;
    line-height: 28px;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    border: none;
    background: #a2a2a2;
    color: #fff;
    overflow: auto;
    line-height: 1.1;
  }
  .demo-iframe {
    width: 375px;
    margin-left: 20px;
    margin-top: 20px;
    box-shadow: 0 0 10px 5px #cecece;
    font-size: 0;

    iframe {
      width: 100%;
    }
  }
}
</style>
