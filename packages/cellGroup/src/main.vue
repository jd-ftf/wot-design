<template>
  <div class="jm-cell-group">
    <slot name="title">
      <div v-if="title" class="jm-cell-group__title">{{ title }}</div>
    </slot>
    <div class="jm-cell-group__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JmCellGroup',
  props: {
    title: String
  }
}
</script>
