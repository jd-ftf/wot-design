<template>
  <div v-clickoutside="handleOutsideClick" class="wd-tooltip">
    <!-- 控制对象 -->
    <span ref="trigger" @click="toggle()">
      <slot></slot>
    </span>
    <!-- 文字提示 -->
    <transition name="wd-fade">
      <div
        class="wd-tooltip__body"
        ref="popover"
        :style="popStyle"
        v-show="showPop"
        :aria-hidden="(disabled || !showPop) ? 'true' : 'false'"
      >
        <div v-if="visibleArrow" ref="arrow" :class="arrowClass" :style="arrowStyle"></div>
        <div>
          <div v-if="content" class="wd-tooltip__inner">{{content}}</div>
          <!-- 内容自定义插槽 -->
          <slot name="content" v-else></slot>
        </div>
        <wd-icon
          v-if="showClose"
          name="close"
          class="wd-tooltip__close-icon"
          @click.native="toggle()"
        ></wd-icon>
      </div>
    </transition>
  </div>
</template>

<script>
import Popper from 'wot-design/src/utils/popover'

export default {
  name: 'WdTooltip',
  data () {
    return {
      showPop: false
    }
  },
  mixins: [Popper],
  props: {
    content: String,
    showClose: Boolean
  },
  computed: {
    arrowClass () {
      return this.visibleArrow && {
        'wd-tooltip__arrow': true,
        'wd-tooltip__arrow-up': this.placement === 'bottom' || this.placement === 'bottom-start' || this.placement === 'bottom-end',
        'wd-tooltip__arrow-right': this.placement === 'left' || this.placement === 'left-start' || this.placement === 'left-end',
        'wd-tooltip__arrow-left': this.placement === 'right' || this.placement === 'right-start' || this.placement === 'right-end',
        'wd-tooltip__arrow-down': this.placement === 'top' || this.placement === 'top-start' || this.placement === 'top-end'
      }
    }
  }
}
</script>
