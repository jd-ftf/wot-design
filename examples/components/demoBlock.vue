<template>
  <div class="demo" ref="demoBlock">
    <div class="demo-code">
      <slot></slot>
    </div>
    <div
      class="demo-html"
      ref="phone"
      :style="phoneStyle"
    >
      <div class="phone-frame">
        <iframe frameborder="0" :src="demoLink" width="320" height="544"></iframe>
        <i class="phone-circle"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoBlock',
  data () {
    return {
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
    phoneListener () {
      let phoneHeight = this.$refs.phone.clientHeight

      if (this.$refs.demoBlock.clientHeight > phoneHeight) {
        let demoBlockRect = this.$refs.demoBlock.getBoundingClientRect()

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
  min-height: 750px;
  margin: 1em 0;
  font-size: 0;

  pre {
    margin: 0;

    code {
      margin: 0;
      padding-right: 36px;
    }
  }
}
.demo-code {
  position: relative;
  display: inline-block;
  width: calc(100% - 390px);
}
.demo-html {
  width: 390px;
  text-align: right;
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
