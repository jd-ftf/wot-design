<template>
  <div class="whitespace" :style="{ margin: `${ver}px ${hor}px` }">
    <slot></slot>
  </div>
</template>

<script>
/**
 * 留白，默认上下10px，左右0px
 */
export default {
  name: 'WhiteSpace',
  props: {
    ver: {
      type: Number,
      default: 10
    },
    hor: {
      type: Number,
      default: 15
    }
  }
}
</script>

<style lang="scss">
.whitespace {
  margin: 10px 0;
  color: #666;
}
</style>
