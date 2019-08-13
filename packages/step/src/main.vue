<template>
  <div
    class="jm-step"
    :class="[ currentStatus ? `is-${currentStatus}` : '', steps.alignCenter ? 'is-center': '', steps.vertical ? 'is-vertical' : '' ]"
    :style="{ 'flex-basis': flexWidth }"
  >
    <div class="jm-step__header" :class="{ 'is-dot': steps.dot }">
      <div class="jm-step__icon" :class="{
        'is-icon': !!icon,
        'is-text': !icon && !steps.dot,
        'is-dot': steps.dot
      }">
        <i v-if="steps.dot" class="jm-step__dot"></i>
        <slot v-else-if="currentStatus !== 'finished' && currentStatus !== 'error' || icon" name="icon">
          <i v-if="icon" class="jm-step__icon-inner" :class="icon"></i>
          <div v-else class="jm-step__icon-outer">{{ index + 1 }}</div>
        </slot>
        <i v-else class="jm-step__icon-inner" :class="['jm-icon-' + (currentStatus === 'finished' ? 'success' : 'close')]"></i>
      </div>
      <div class="jm-step__line"></div>
    </div>
    <div class="jm-step__content">
      <div class="jm-step__title" :class="{ 'is-description': !!description }">{{ currentTitle }}</div>
      <div v-if="description" class="jm-step__description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
import locale from '@/mixins/locale'

export default {
  name: 'JmStep',
  mixins: [locale],
  inject: ['steps'],
  props: {
    title: String,
    description: String,
    icon: String,
    status: String
  },
  computed: {
    index () {
      return this.steps.items.indexOf(this)
    },
    currentStatus () {
      if (this.status) {
        return this.status
      }

      if (this.steps.active > this.index) {
        return 'finished'
      } else if (this.steps.active === this.index) {
        return 'process'
      } else {
        return 'wait'
      }
    },
    flexWidth () {
      if (this.steps.vertical) return

      return this.steps.space || (100 / this.steps.items.length + '%')
    },
    currentTitle () {
      if (this.title) return this.title

      switch (this.currentStatus) {
        case 'finished':
          return this.t('jmd.steps.finished')
        case 'error':
          return this.t('jmd.steps.failed')
        case 'process':
          return this.t('jmd.steps.process')
        case 'wait':
        default:
          return this.t('jmd.steps.wait')
      }
    }
  },
  created () {
    if (this.steps) {
      this.steps.items.push(this)
    }
  },
  beforeDestroy () {
    this.steps.items.splice(this.steps.items.indexOf(this), 1)
  }
}
</script>
