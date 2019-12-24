<template>
  <button
    :type="nativeType"
    class="wd-button"
    :class="btnClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <wd-indicator v-if="loading" class="wd-button__loading" type="spinner" size="" color="" />
    <i v-if="icon" class="wd-button__icon" :class="icon"></i>
    <span class="wd-button__txt"><slot></slot></span>
  </button>
</template>

<script>
import WdLoading from 'wot-design/packages/loading'

export default {
  name: 'WdButton',
  components: {
    WdIndicator: WdLoading.Indicator
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
