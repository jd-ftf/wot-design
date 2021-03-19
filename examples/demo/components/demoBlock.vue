<template>
  <div class="demo-block" :class="{ 'is-transparent': transparent }">
    <div v-if="title || $slots.title" class="demo-block__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="demo-block__body" :style="{ 'margin': `${ver}px ${hor}px` }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoBlock',
  props: {
    title: String,
    transparent: Boolean,
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
.demo-block {
  margin: 15px 0;
  padding: 1px 0;
  color: #666;
  background: #fff;

  .demo-block__title {
    margin: 10px 0;
    padding: 0 15px;
    line-height: 1.4;
  }
  .demo-block__body {
    margin: 10px 0;
  }
  &.is-transparent {
    padding: 0;
    background: transparent;
  }
}
</style>
