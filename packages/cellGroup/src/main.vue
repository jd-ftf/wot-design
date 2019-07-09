<template>
  <div class="jm-cell-group-outer">
    <div class="jm-cell-group">
      <div class="jm-cell-group-left">
        <slot name="left"></slot>
      </div>
      <h1 class="jm-cell-group-title" v-text="title"></h1>
      <div class="jm-cell-group-right">
        <slot name="right"></slot>
      </div>
    </div>
    <slot></slot>
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
