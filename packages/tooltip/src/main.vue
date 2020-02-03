<template>
  <span>
    <slot></slot>
    <div v-show="isShow">
      <div class="tooltip" ref="popper">
        <span v-text="content"></span>
        <div class="tooltip-arrow" x-arrow></div>
      </div>
    </div>
  </span>
</template>
<script>
// import transition from 'wot-design/packages/transition'

export default {
  name: 'WdToast',
  components: {
    // transition
  }
}
</script>
