<template>
  <button
    class="jm-button"
    :class="btnClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <i></i>
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'JmButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    inline: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass () {
      let btnClass = []
      btnClass.push(`jm-button--${this.type}`)
      btnClass.push(`jm-button--${this.size}`)
      this.inline && btnClass.push('jm-button--inline')
      this.disabled && btnClass.push('jm-button--disabled')

      return btnClass
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
