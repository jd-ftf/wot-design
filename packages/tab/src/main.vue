<template>
  <div class="jm-tab" :style="tabStyle">
    <div class="jm-tab__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JmTab',
  inject: ['tabs'],
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
      let sty
      if (!this.isActive) {
        sty = {
          height: 0,
          overflow: 'visible'
        }
      }
      return sty
    }
  },
  created () {
    if (this.tabs) {
      this.tabs.items.push(this)
    }
  },
  destroyed () {
    this.tabs.items.slice(this.tabs.items.indexOf(this), 1)
  }
}
</script>
