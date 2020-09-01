<template>
  <button
    :type="nativeType"
    class="wd-button"
    :class="btnClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="loading" class="wd-button__loading">
      <svg viewBox="0 0 42 42">
        <defs>
          <linearGradient x1="100%" y1="0%" x2="0%" y2="0%" :id="loadingId">
            <stop :stop-color="!plain ? 'currentColor' : '#fff'" stop-opacity="0" offset="0%" />
            <stop :stop-color="!plain ? 'currentColor' : '#fff'" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <path
            d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z"
            :fill="!plain ? '#fff' : 'currentColor'"
          />
          <path
            d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376"
            :stroke="`url(#${loadingId})`"
            stroke-width="3.5"
            stroke-linecap="round"
          />
        </g>
      </svg>
    </span>
    <i v-if="icon" class="wd-button__icon" :class="icon"></i>
    <span class="wd-button__txt"><slot></slot></span>
  </button>
</template>

<script>
import context from 'wot-design/src/utils/id'

export default {
  name: 'WdButton',
  data () {
    return {
      loadingId: context.id++
    }
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
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
    handleClick (event) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', event)
      }
    }
  }
}
</script>
