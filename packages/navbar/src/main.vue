<template>
  <header class="wd-navbar" :class="{ 'is-light': light }">
    <div class="wd-navbar__side wd-navbar__side-left">
      <slot name="left"></slot>
    </div>
    <div class="wd-navbar__title">{{ title }}</div>
    <div class="wd-navbar__side wd-navbar__side-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'WdNavbar',
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
