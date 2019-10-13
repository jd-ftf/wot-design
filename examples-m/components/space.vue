<template>
  <div class="space">
    <div v-if="title || $slots.title" class="space__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="space__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Space',
  props: {
    title: String
  }
}
</script>

<style lang="scss">
.space {
  margin: 20px 0;

  .space__title {
    padding: 0 15px;
    margin: 10px 0;
    color: #666;
  }
  .space__body {
    margin: 10px 0;
  }
}
</style>
