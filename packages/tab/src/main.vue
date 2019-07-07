<template>
  <div class="jm-tab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JmTab',
  props: {
    title: String,
    name: String,
    disabled: Boolean
  },
  beforeCreate () {
    this.$parent.items.push(this)
  },
  destroyed () {
    this.$parent.items.slice(this.$parent.items.indexOf(this), 1)
  }
}
</script>
