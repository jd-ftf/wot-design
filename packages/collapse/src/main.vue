<template>
  <div class="jm-collapse" :class="{ 'is-viewmore': viewmore }">
    <slot v-if="!viewmore"></slot>
    <template v-else>
      <div class="jm-collapse__content" :class="{ 'is-retract': !value }" :style="{ '-webkit-line-clamp': contentLineNum }">
        <slot></slot>
      </div>
      <div class="jm-collapse__more" @click="switchValue(!value)">
        <slot name="more">
          <span class="jm-collapse__more-txt">{{ t(!value ? 'jmd.collapse.expand' : 'jmd.collapse.retract') }}</span>
          <i class="jm-collapse__arrow jm-icon-arrow-down" :class="{ 'is-retract': value }"></i>
        </slot>
      </div>
    </template>
  </div>
</template>

<script>
import locale from 'jm-design/src/mixins/locale'

export default {
  name: 'JmCollapse',
  mixins: [locale],
  provide () {
    return {
      collapse: this
    }
  },
  props: {
    value: [String, Array, Boolean],
    accordion: Boolean,
    viewmore: Boolean,
    lienNum: {
      type: Number,
      default: 2
    }
  },
  computed: {
    contentLineNum () {
      return this.viewmore && !this.value
        ? this.lienNum
        : ''
    }
  },
  methods: {
    switchValue (name, expanded) {
      if (!this.accordion && !this.viewmore) {
        name = expanded
          ? this.value.concat(name)
          : this.value.filter(item => item !== name)
      }
      this.$emit('input', name)
      this.$emit('change', name)
    }
  }
}
</script>
