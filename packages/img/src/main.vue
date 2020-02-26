<template>
  <div
    class="wd-img"
    @click="handleClick"
  >
    <img
      :src="src"
      :alt="alt"
    />
  </div>
</template>
<script>
export default {
  name: 'WdImg',
  props: {
    src: String,
    alt: String
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
