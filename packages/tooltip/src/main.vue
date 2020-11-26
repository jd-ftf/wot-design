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
        :ref="el"
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
import Popper from 'wot-design/src/mixins/popover'
import context from 'wot-design/src/utils/id'

export default {
  name: 'WdTooltip',

  mixins: [Popper],

  data () {
    return {
      el: 'tooltip',
      popId: `el-tooltip-${context.id++}`
    }
  },

  props: {
    content: String,
    showClose: Boolean
  }
}
</script>
