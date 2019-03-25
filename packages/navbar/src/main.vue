<template>
  <header class="jm-navbar" :class="{ 'is-light': light }">
    <div class="jm-navbar__side jm-navbar__side-left">
      <slot name="left"></slot>
    </div>
    <div class="jm-navbar__title">{{ title }}</div>
    <div class="jm-navbar__side jm-navbar__side-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'JmNavbar',
  props: {
    title: {
      type: String,
      required: true
    },
    light: {
      type: Boolean,
      default: false
    }
  }
}
</script>
