<template>
  <div
    v-if="show"
    class="wd-notice-bar"
    :class="{
      'wd-notice-bar--ellipse': !wrapable && !scrollable,
      'wd-notice-bar--wrap': wrapable && !scrollable
    }"
    :style="{ 'background': backgroundColor, 'color': color }"
  >
    <slot name="left-icon">
      <i v-if="leftIcon" :class="`wd-notice-bar__left-icon wd-icon-${leftIcon}`"></i>
    </slot>
    <div class="wd-notice-bar__wrap" ref="wrap">
      <div
        class="wd-notice-bar__content"
        :class="[ animationClass ]"
        :style="{
          'padding-left': (firstPlay ? 0 : wrapWidth) + 'px',
          'animation-delay': (firstPlay ? delay : 0) + 's',
          'animation-duration': duration + 's'
        }"
        ref="content"
        @animationend="animationEnd"
        @webkitAnimationEnd="animationEnd"
      >
        <slot>
          {{ text }}
        </slot>
      </div>
    </div>
    <slot name="right-icon">
      <i v-if="closable" class="wd-notice-bar__right-icon wd-icon-close" @click="handleClick"></i>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'WdNoticeBar',
  data () {
    return {
      firstPlay: true,
      animationClass: '',
      wrapWidth: 0,
      contentWidth: 0,
      show: true,
      duration: 0
    }
  },
  props: {
    text: String,
    scrollable: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 1
    },
    speed: {
      type: Number,
      default: 50
    },
    closable: Boolean,
    wrapable: Boolean,
    leftIcon: String,
    color: String,
    backgroundColor: String
  },
  watch: {
    text: {
      immediate: true,
      handler () {
        this.$nextTick(() => {
          if (!this.$refs.wrap || !this.$refs.content) return

          const wrapWidth = this.$refs.wrap.getBoundingClientRect().width
          const contentWidth = this.$refs.content.getBoundingClientRect().width

          if (this.scrollable && contentWidth > wrapWidth) {
            this.wrapWidth = wrapWidth
            this.contentWidth = contentWidth
            this.duration = contentWidth / this.speed
            this.animationClass = 'wd-notice-bar__content--play'
          }
        })
      }
    }
  },
  methods: {
    handleClick (event) {
      this.show = false
      this.$emit('click', event)
    },
    animationEnd () {
      this.firstPlay = false
      this.$nextTick(() => {
        this.duration = (this.wrapWidth + this.contentWidth) / this.speed
        this.animationClass = 'wd-notice-bar__content--play-infinite'
      })
    }
  }
}
</script>
