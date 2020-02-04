<template>
  <div>
    <!-- 控制对象 -->
    <span ref="trigger" @click="toggle">
      <slot></slot>
    </span>
    <!-- 文字提示 -->
    <div class="wd-tooltip" ref="popover" :style="popoverStyle" v-show="show">
      <div :class="arrowClass"></div>
      <div @click="$emit('on-click-content')">
        <slot name="content">
          <div v-html="content"></div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WdTooltip',
  mounted () {
    this.$nextTick(() => {
      this.init()
      window.addEventListener('resize', this.reset)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.reset)
  },
  props: {
    content: String,
    placement: String,
    gutter: {
      type: Number,
      default: 5
    }
  },
  methods: {
    reset () {
      if (this.show) {
        this.init(true)
      }
    },
    init (isReset) {
      const trigger = this.$refs.trigger.children[0]
      const popover = this.$refs.popover
      const scrollTop = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      console.log('位置', trigger, popover, scrollTop)
      switch (this.placement) {
        case 'top':
          this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2
          this.position.top = scrollTop + trigger.getBoundingClientRect().top - popover.offsetHeight - this.gutter
          break
        case 'left':
          this.position.left = trigger.offsetLeft - popover.offsetWidth - this.gutter
          this.position.top = scrollTop + trigger.getBoundingClientRect().top + trigger.offsetHeight / 2 - popover.offsetHeight / 2
          break
        case 'right':
          this.position.left = trigger.offsetLeft + trigger.offsetWidth + this.gutter
          this.position.top = scrollTop + trigger.getBoundingClientRect().top + trigger.offsetHeight / 2 - popover.offsetHeight / 2
          break
        case 'bottom':
          this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2
          this.position.top = scrollTop + trigger.getBoundingClientRect().top + trigger.offsetHeight + this.gutter
          break
        default:
          console.warn('Wrong placement prop')
      }
      if (!isReset) {
        this.show = false
      }

      this.popoverStyle = {
        top: this.position.top + 'px',
        left: this.position.left + 'px',
        display: isReset ? this.popoverStyle.display : 'none'
      }
    },
    onClickedOutside () {
      if (this.show) {
        this.show = false
        this.$emit('on-hide')
      }
    },
    toggle () {
      this.show = !this.show
      if (this.show) {
        this.$nextTick(() => {
          this.init(true)
        })
      }
      this.$emit(`on-${this.show === true ? 'show' : 'hide'}`)
    }
  },
  data () {
    return {
      position: {
        top: 0,
        left: 0
      },
      show: true,
      popoverStyle: {}
    }
  },
  computed: {
    arrowClass () {
      return {
        'wd-tooltip-arrow': true,
        'wd-tooltip-arrow-up': this.placement === 'bottom',
        'wd-tooltip-arrow-right': this.placement === 'left',
        'wd-tooltip-arrow-left': this.placement === 'right',
        'wd-tooltip-arrow-down': this.placement === 'top'
      }
    }
  }
}
</script>

<style lang="scss">
$color-gray: #35495e;
$tooltip-border-width: 5px;
$font-color: black;

.wd-tooltip {
  position: absolute;
  left: 0;
  top: 0;
  background-color: $color-gray;
  color: $font-color;
  border-radius: 5px;
  z-index: 500;
}
.wd-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
}
.wd-tooltip-arrow-up {
  border-left: $tooltip-border-width solid transparent;
  border-right: $tooltip-border-width solid transparent;
  border-bottom: $tooltip-border-width solid $color-gray;
  left: 50%;
  transform: translateX(-50%);
  top: -$tooltip-border-width;
}
.wd-tooltip-arrow-down {
  border-left: $tooltip-border-width solid transparent;
  border-right: $tooltip-border-width solid transparent;
  border-top: $tooltip-border-width solid $color-gray;
  left: 50%;
  transform: translateX(-50%);
  bottom: -$tooltip-border-width;
}
.wd-tooltip-arrow-left {
  border-top: $tooltip-border-width solid transparent;
  border-bottom: $tooltip-border-width solid transparent;
  border-right: $tooltip-border-width solid $color-gray;
  top: 50%;
  transform: translateY(-50%);
  left: -$tooltip-border-width;
}
.wd-tooltip-arrow-right {
  border-top: $tooltip-border-width solid transparent;
  border-bottom: $tooltip-border-width solid transparent;
  border-left: $tooltip-border-width solid $color-gray;
  top: 50%;
  transform: translateY(-50%);
  right: -$tooltip-border-width;
}
</style>
