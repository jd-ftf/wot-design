<template>
  <div class="wd-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="wd-collapse-item__header" @click="toggle">
      <div>
        <span class="wd-collapse-item__title">{{ title }}</span>
      </div>
      <div>
        <i class="wd-collapse-item__arrow wd-icon-arrow-down" :class="{ 'is-retract': isExpand }"></i>
      </div>
    </div>
    <div v-show="show" class="wd-collapse-item__wrapper" ref="wrapper" :style="{ 'height': height + 'px' }" @transitionend="onTransitionend">
      <div class="wd-collapse-item__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WdCollapseItem',
  inject: ['collapse'],
  data () {
    return {
      scrollHeight: 0,
      height: '',
      show: false
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    disabled: Boolean
  },
  computed: {
    isExpand () {
      if (!this.collapse.value) {
        console.warn('[wot-design warning]there is no value with Collapse.')
        return true
      }

      return this.collapse.accordion
        ? this.collapse.value === this.name
        : this.collapse.value.indexOf(this.name) > -1
    }
  },
  watch: {
    isExpand () {
      // 首次渲染时，默认打开时用 $nextTick 首次收起无动画
      const nextTick = (this.isExpand || this.collapse.accordion) ? this.$nextTick : (callback) => { setTimeout(() => { callback.call(this) }, 16) }

      if (this.isExpand) {
        this.show = true
        this.height = 0

        nextTick(() => {
          this.height = this.$refs.wrapper.scrollHeight
        })
      } else {
        this.height = this.$refs.wrapper.scrollHeight

        nextTick(() => {
          this.height = 0
        })
      }
    }
  },
  methods: {
    toggle () {
      if (this.disabled) return

      this.collapse.switchValue(this.name, !this.isExpand)
    },
    onTransitionend () {
      if (!this.isExpand) {
        this.show = false
      } else {
        this.height = ''
      }
    }
  },
  created () {
    this.show = this.isExpand
  }
}
</script>
