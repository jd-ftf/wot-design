<template>
  <button
    :type="nativeType"
    class="jm-button"
    :class="btnClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <jm-indicator v-if="loading" class="jm-button__loading" type="spinner" size="" color="" />
    <i v-if="icon" class="jm-button__icon" :class="icon"></i>
    <span class="jm-button__txt"><slot></slot></span>
  </button>
</template>

<script>
import JmIndicator from '../../loading/src/indicator'

export default {
  name: 'JmButton',
  components: {
    JmIndicator
  },
  props: {
    type: String,
    round: Boolean,
    plain: Boolean,
    loading: Boolean,
    block: Boolean,
    suck: Boolean,
    size: {
      type: String,
      default: 'medium'
    },
    disabled: Boolean,
    nativeType: {
      type: String,
      default: 'button'
    },
    icon: String
  },
  computed: {
    btnClass () {
      let btnClass = []
      this.type && btnClass.push(`is-${this.type}`)
      btnClass.push(`is-${this.size}`)
      this.inline && btnClass.push('is-inline')
      this.disabled && btnClass.push('is-disabled')
      this.round && btnClass.push('is-round')
      this.plain && btnClass.push('is-plain')
      this.loading && btnClass.push('is-loading')
      this.suck && btnClass.push('is-suck')
      this.block && btnClass.push('is-block')

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
