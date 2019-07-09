<template>
  <a class="jm-cell" :href="href">
    <span class="jm-cell-mask" v-if="isLink"></span>
    <div class="jm-cell-left">
      <slot name="left"></slot>
    </div>
    <div class="jm-cell-outer">
      <slot name="icon">
        <i v-if="icon" class="jmui-icon" :class="icon"></i>
      </slot>
      <div class="jm-cell-wrapper">
        <div class="jm-cell-title">
          <slot name="title">
            <span class="jm-cell-text" v-text="title"></span>
            <span v-if="label" class="jm-cell-label" v-text="label"></span>
          </slot>
        </div>
        <div class="jm-cell-value" :class="{ 'is-link' : isLink }">
          <slot>
            <span v-text="value"></span>
          </slot>
        </div>
        <i v-if="isLink" class="jm-cell-allow-right"></i>
      </div>
    </div>
    <div class="jm-cell-right">
      <slot name="right"></slot>
    </div>
  </a>
</template>

<script>

export default {
  name: 'JmCell',
  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {}
  },
  data: function () {
    return {
      added: false
    }
  },
  computed: {
    href () {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to)
        if (!resolved.matched.length) return this.to
        this.$nextTick(() => {
          // eslint-disable-next-line
          this.added = true
          this.$el.addEventListener('click', this.handleClick)
        })
        return resolved.fullPath || resolved.path
      }
      return this.to
    }
  },

  methods: {
    handleClick ($event) {
      $event.preventDefault()
      this.$router.push(this.href)
    }
  }
}
</script>
