<template>
  <div class="jm-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="jm-collapse-item__header" @click="toggle">
      <div>
        <span class="jm-collapse-item__title">{{ title }}</span>
      </div>
      <div>
        <i class="jm-collapse-item__arrow jm-icon-arrow-down" :class="{ 'is-retract': isExpand }"></i>
      </div>
    </div>
    <div v-show="show" class="jm-collapse-item__wrapper" ref="wrapper" :style="{ 'height': height + 'px' }" @transitionend="onTransitionend">
      <div class="jm-collapse-item__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JmCollapseItem',
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
        console.warn('[jm-design warning]there is no value with Collapse.')
        return true
      }

      return this.collapse.accordion
        ? this.collapse.value === this.name
        : this.collapse.value.indexOf(this.name) > -1
    }
  },
  watch: {
    isExpand () {
      if (this.isExpand) {
        this.show = true
        this.height = 0

        this.$nextTick(() => {
          this.height = this.$refs.wrapper.scrollHeight
        })
      } else {
        this.height = this.$refs.wrapper.scrollHeight

        this.$nextTick(() => {
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
