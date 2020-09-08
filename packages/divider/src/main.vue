<template>
  <div class="wd-divider">
    <i class="wd-divider__line" :style="{ background: color }"></i>
    <div class="wd-divider__content" :style="{ color: color }">
      <slot></slot>
    </div>
    <i class="wd-divider__line" :style="{ background: color }"></i>
  </div>
</template>

<script>
export default {
  name: 'WdDivider',
  props: {
    color: String
  }
}
</script>
