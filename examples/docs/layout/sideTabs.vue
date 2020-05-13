<template>
  <div>
    <side-bar parentKey="components"></side-bar>
    <div class="tab-content">
      <div class="content-flex" ref="demoBlock">
        <div class="wd-markdown">
          <router-view></router-view>
          <page-controller></page-controller>
        </div>
        <div class="demo-iframe" v-show="$route.meta.demo">
          <div class="phone-header">
            <img class="phone-title" src="../assets/img/phtitle.png" />
            <input readonly v-model="demoLink" class="phone-link" />
          </div>
          <iframe frameborder="0" :src="demoLink" ref="iframe"></iframe>
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
      bodyContent: null
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
    renderAnchorHref() {
      const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a')
      const basePath = location.href.split('#').splice(0, 2).join('#')

      Array.prototype.slice.call(anchors).forEach(a => {
        const href = a.getAttribute('href')
        a.href = href.indexOf(basePath) > -1 ? href : (basePath + href)
      })
    },
    goAnchor () {
      if (location.href.match(/#/g).length > 1) {
        const anchor = location.href.match(/#[^#]+$/g)
        if (!anchor) return
        const elm = document.querySelector(anchor[0])
        if (!elm) return

        setTimeout(() => {
          this.bodyContent.scrollTop = elm.offsetTop
        }, 50)
      }
    }
  },
  mounted () {
    this.bodyContent = document.querySelector('.body-content')
    this.renderAnchorHref()
    this.goAnchor()
  },
  beforeRouteUpdate (to, from, next) {
    this.$refs.iframe.contentWindow.scrollTo(0, 0)
    next()
    const toPath = to.path
    const fromPath = from.path
    if (toPath !== fromPath) {
      this.bodyContent.scrollTop = 0
    }
    setTimeout(() => {
      if (toPath === fromPath && to.hash) {
        this.goAnchor()
      }

      if (toPath !== fromPath) {
        this.renderAnchorHref()
      }
    }, 100)
  }
}
</script>

<style lang="scss">
.tab-content{
  margin: 0 530px 100px 375px;

  .content-flex {
    position: relative;
  }
  .wd-markdown {
    padding-top: 10px;
    margin-top: 10px;

    h1, h2, h3, h4, h5, h6 {
      position: relative;

      &:hover {
        .header-anchor {
          opacity: 0.4;
        }
      }
    }
    .header-anchor {
      float: left;
      margin-left: -15px;
      opacity: 0;
    }
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
    position: fixed;
    top: 60px;
    right: 120px;
    width: 375px;
    margin-top: 30px;
    box-shadow: 0 0 10px #cecece;
    font-size: 0;

    iframe {
      width: 100%;
      height: 597px;
    }
  }
}
@media (max-width: 1536px) and (max-height: 750px) {
  .tab-content {
    margin-left: 275px;
    margin-right: 460px;
    margin-bottom: 0;

    .demo-iframe {
      right: 80px;
      width: 360px;
      margin-top: 20px;

      iframe {
        height: 550px;
      }
    }
  }
}
@media (max-width: 1366px) and (max-height: 670px) {
  .tab-content {
    margin-left: 275px;
    margin-right: 420px;
    margin-bottom: 0;

    .demo-iframe {
      right: 80px;
      width: 320px;
      margin-top: 20px;

      iframe {
        height: 460px;
      }
    }
  }
}
@media (max-width: 1000px) {
  .tab-content {
    margin-left: 275px;
    margin-right: 30px;

    .demo-iframe {
      display: none;
    }
  }
}
@media (max-width: 773px) {
  .tab-content {
    margin: 0 15px 10px;
  }
  .side-bar {
    position: static;
    margin: 60px 15px 10px;
    padding-bottom: 0;
  }
  .wot-search-input {
    display: none;
  }
}
</style>
