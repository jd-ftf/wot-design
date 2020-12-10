<template>
  <div
    v-if="show"
    class="wd-notice-bar"
    :class="[
      {'wd-notice-bar--ellipse': !wrapable && !scrollable},
      {'wd-notice-bar--wrap': wrapable && !scrollable},
      'is-' + type
    ]"
    :style="{ 'background': backgroundColor, 'color': color }"
  >
    <slot name="prefix">
      <i v-if="prefix" :class="`wd-notice-bar__prefix wd-icon-${prefix}`"></i>
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
        <slot>{{ text }}</slot>
      </div>
    </div>
    <span v-if="closable" class="wd-notice-bar__suffix">
      <i class="wd-icon-close-bold" @click="handleClick"></i>
    </span>
    <slot name="suffix"></slot>
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
    // warning | info | danger
    type: {
      type: String,
      default: 'warning'
    },
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
    prefix: String,
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
