<template>
  <div v-clickoutside="handleOutsideClick" class="wd-popover">
    <!-- 控制对象 -->
    <span ref="trigger" @click="toggle()">
      <slot></slot>
    </span>
    <!-- 文字提示 -->
    <transition name="wd-fade">
      <div class="wd-popover__body" ref="popover" :style="popStyle" v-show="showPop">
        <div v-if="visibleArrow" ref="arrow" :class="arrowClass" :style="arrowStyle"></div>
        <!-- 内容自定义插槽 -->
        <div v-if="$slots.content" class="wd-popover__inner">
          <slot name="content"></slot>
        </div>
        <!-- 普通模式传入文字 mode = "normal" -->
        <div v-else-if="mode === 'normal'" class="wd-popover__inner">{{content}}</div>
        <!-- 列表模式 mode = "menu" -->
        <div v-else-if="mode === 'menu'" class="wd-popover__menu">
          <div
            v-for="(item,index) in content"
            :key="index"
            @click="menuClick(item,index)"
            class="wd-popover__menu-inner"
          >
            <i
              v-if="item.iconClass"
              :class="[
              item.iconClass ? 'wd-popover__icon' : '',
              item.iconClass
            ]"
            ></i>
            <span>{{item.content}}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Popper from 'wot-design/src/utils/popover'

export default {
  name: 'WdPopover',
  mixins: [Popper],
  props: {
    content: [String, Array],
    mode: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    arrowClass () {
      return this.visibleArrow && {
        'wd-popover__arrow': true,
        'wd-popover__arrow-up': this.placement === 'bottom' || this.placement === 'bottom-start' || this.placement === 'bottom-end',
        'wd-popover__arrow-right': this.placement === 'left' || this.placement === 'left-start' || this.placement === 'left-end',
        'wd-popover__arrow-left': this.placement === 'right' || this.placement === 'right-start' || this.placement === 'right-end',
        'wd-popover__arrow-down': this.placement === 'top' || this.placement === 'top-start' || this.placement === 'top-end'
      }
    }
  },
  methods: {
    // 菜单模式，跳转关闭
    menuClick (item, index) {
      this.showPop && this.toggle()
      this.$emit('menu-click', item, index)
    }
  }
}
</script>
