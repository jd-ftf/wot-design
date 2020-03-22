<template>
  <div class="demo-block" :class="{ 'is-transparent': transparent }">
    <div v-if="title || $slots.title" class="demo-block__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="demo-block__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoBlock',
  props: {
    title: String,
    transparent: Boolean
  }
}
</script>

<style lang="scss">
.demo-block {
  margin: 15px 0;
  padding: 1px 15px;
  color: #666;
  background: #fff;

  .demo-block__title {
    margin: 10px 0;
    line-height: 1.4;
  }
  .demo-block__body {
    margin: 10px 0;
  }
  &.is-transparent {
    padding: 0;
    background: transparent;

    .demo-block__title {
      padding: 0 15px;
    }
  }
}
</style>
