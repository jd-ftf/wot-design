<template>
  <div class="jm-cell-group">
    <div v-if="showTitle" class="jm-cell-group__title">
      <div class="jm-cell-group__left">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="jm-cell-group__right">
        <slot name="value">
          {{ value }}
        </slot>
      </div>
    </div>
    <div class="jm-cell-group__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JmCellGroup',
  props: {
    title: String,
    value: String
  },
  computed: {
    showTitle () {
      return this.title || this.$slots.title || this.value || this.$slots.value
    }
  }
}
</script>
