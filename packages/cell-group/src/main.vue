<template>
  <div class="wd-cell-group" :class="border ? 'is-border' : ''">
    <div v-if="showTitle" class="wd-cell-group__title">
      <div class="wd-cell-group__left">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="wd-cell-group__right">
        <slot name="value">{{ value }}</slot>
      </div>
    </div>
    <div class="wd-cell-group__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WdCellGroup',
  props: {
    title: String,
    border: Boolean,
    value: String
  },
  computed: {
    showTitle () {
      return this.title || this.$slots.title || this.value || this.$slots.value
    }
  }
}
</script>
