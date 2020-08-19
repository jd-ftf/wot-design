<template>
  <div
    class="wd-collapse"
    :class="[{ 'is-viewmore': viewmore }]"
  >
    <slot v-if="!viewmore"></slot>
    <template v-else>
      <div
        class="wd-collapse__content"
        :class="{ 'is-retract': !value }"
        :style="{ '-webkit-line-clamp': contentLineNum }"
      >
        <slot></slot>
      </div>
      <div
        class="wd-collapse__more"
        @click="switchValue(!value)"
      >
        <slot name="more">
          <span class="wd-collapse__more-txt">{{ t(!value ? 'wd.collapse.expand' : 'wd.collapse.retract') }}</span>
          <!-- TODO 设计稿 icon 大小不符 -->
          <i
            class="wd-collapse__arrow wd-icon-arrow-down"
            :class="{ 'is-retract': value }"
          ></i>
        </slot>
      </div>
    </template>
  </div>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'

export default {
  name: 'WdCollapse',
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
