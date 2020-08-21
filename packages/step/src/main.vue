<template>
  <div
    class="wd-step"
    :class="[ currentStatus ? `is-${currentStatus}` : '', steps.canAlignCenter ? 'is-center': '', steps.vertical ? 'is-vertical' : '' ]"
    :style="space"
  >
    <div class="wd-step__header" :class="{ 'is-dot': steps.dot }">
      <div class="wd-step__icon" :class="{
        'is-icon': !!icon || $slots.icon,
        'is-text': !steps.dot && !icon && !$slots.icon,
        'is-dot': steps.dot
      }">
        <i v-if="steps.dot" class="wd-step__dot"></i>
        <slot v-else name="icon">
          <i v-if="icon" class="wd-step__icon-inner" :class="icon"></i>
          <div v-else class="wd-step__icon-outer">
            <i v-if="currentStatus === 'finished'" class="wd-icon-check-bold"></i>
            <i v-else-if="currentStatus === 'error'" class="wd-icon-close-bold"></i>
            <span v-else>{{ index + 1 }}</span>
          </div>
        </slot>
      </div>
      <div class="wd-step__line"></div>
    </div>
    <div class="wd-step__content">
      <div class="wd-step__title" :class="{ 'is-description': !!description || $slots.description }">
        <slot name="title">
          {{ currentTitle }}
        </slot>
      </div>
      <div v-if="description || $slots.description" class="wd-step__description">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'

export default {
  name: 'WdStep',
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
    space () {
      if (this.steps.vertical && this.steps.space) {
        return {
          height: this.steps.space
        }
      }

      return {
        'flex-basis': this.steps.space || (100 / this.steps.items.length + '%')
      }
    },
    currentTitle () {
      if (this.title) return this.title

      switch (this.currentStatus) {
        case 'finished':
          return this.t('wd.steps.finished')
        case 'error':
          return this.t('wd.steps.failed')
        case 'process':
          return this.t('wd.steps.process')
        case 'wait':
        default:
          return this.t('wd.steps.wait')
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
