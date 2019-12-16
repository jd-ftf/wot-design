<template>
  <div class="jm-tab" :style="tabStyle">
    <slot v-if="shouldRender"></slot>
  </div>
</template>

<script>
export default {
  name: 'JmTab',
  inject: ['tabs'],
  data () {
    return {
      init: false
    }
  },
  props: {
    title: String,
    name: String,
    disabled: Boolean
  },
  computed: {
    index () {
      return this.tabs.items.indexOf(this)
    },
    isActive () {
      return this.index === this.tabs.activeIndex
    },
    tabStyle () {
      return {
        width: this.tabs.clientWidth + 'px'
      }
    },
    shouldRender () {
      return this.init || !this.tabs.lazyRender
    }
  },
  watch: {
    isActive () {
      this.init = this.init || this.isActive
    }
  },
  created () {
    if (this.tabs) {
      this.tabs.items.push(this)
    }
  },
  destroyed () {
    this.tabs.items.splice(this.tabs.items.indexOf(this), 1)
  }
}
</script>
