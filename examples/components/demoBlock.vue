<template>
  <div class="demo" ref="demoBlock" :style="{ 'min-height': showDemo ? '751px' : '' }">
    <div class="demo-code" :class="{ 'demo-code-shrink': showDemo }">
      <slot></slot>
      <a class="demo-open" @click="toggleDemo">
        <i class="iconfont icon-jiantou-right" :class="{ 'icon-jiantou-left': !showDemo }"></i>
      </a>
    </div>
    <transition name="slide">
      <div
        v-show="showDemo"
        class="demo-html"
        ref="phone"
        :style="phoneStyle"
      >
        <div class="phone-frame">
          <iframe frameborder="0" :src="demoLink" width="320" height="544"></iframe>
          <i class="phone-circle"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DemoBlock',
  data () {
    return {
      showDemo: true,
      phoneStyle: {
        position: 'absolute',
        right: '0',
        top: '0'
      }
    }
  },
  props: {
    url: String,
    demoLink: String
  },
  methods: {
    toggleDemo () {
      this.showDemo = !this.showDemo
    },
    phoneListener () {
      let phoneHeight = this.$refs.phone.clientHeight

      if (this.$refs.demoBlock.clientHeight > phoneHeight) {
        let demoBlockRect = this.$refs.demoBlock.getBoundingClientRect()
        console.log(demoBlockRect.bottom, phoneHeight)

        if (demoBlockRect.top - 60 < 0 && demoBlockRect.bottom - 60 > phoneHeight) {
          this.phoneStyle = {
            position: 'fixed',
            right: '150px',
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
  destroyed () {
    window.removeEventListener('scroll', this.phoneListener)
  }
}
</script>

<style lang="scss">
@import '../assets/style/variable.scss';

.demo {
  position: relative;
  width: 100%;
  margin: 1em 0;
  font-size: 0;

  pre {
    margin: 0;

    code {
      margin: 0;
      padding-right: 36px;
    }
  }
  .demo-open {
    position: absolute;
    right: 2px;
    top: 2px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    overflow: hidden;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 8px #ccc;
    border-radius: 50%;

    &:hover {
      .iconfont {
        color: $color-theme-l2;
      }
    }
    .iconfont {
      color: #999;
      font-size: 18px;
      transition: color 0.3s;
    }
  }
}
.demo-code {
  position: relative;
  display: inline-block;
  width: 100%;
  transition: width 0.5s;
}
.demo-code-shrink {
  width: calc(100% - 390px);
}
.demo-html {
  width: 390px;
  text-align: right;
  transition: all 0.5s;
  overflow: hidden;
  transform: scale(1);
  transform-origin: right top;

  .phone-frame {
    display: inline-block;
    width: 370px;
    height: 751px;
    margin: 0 auto;
    padding: 110px 25px 0 25px;
    box-sizing: border-box;
    background: url('../assets/img/iphone.png') no-repeat;
    background-size: cover;
  }
  iframe {
    background: #fff;
  }
}

.slide-enter, .slide-leave-active {
  .demo-code {
    width: 100%;
  }
  &.demo-html {
    transform: scale(0);
  }
}
</style>
