<template>
  <div class="jm-tag" :class="tagClass" :style="{ 'background': bgColor, 'border-color': bgColor }">
    <slot name="icon">
      <i v-if="icon" class="jm-tag__icon" :class="icon"></i>
    </slot>
    <span class="jm-tag__text" :style="{ 'color': color }">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'JmTag',
  props: {
    type: String,
    icon: String,
    closable: Boolean,
    plain: Boolean,
    color: String,
    bgColor: String,
    size: String
  },
  computed: {
    tagClass () {
      let tagClass = []

      this.type && tagClass.push(`is-${this.type}`)
      this.plain && tagClass.push('is-plain')
      this.size && tagClass.push(`is-${this.size}`)

      return tagClass
    }
  }
}
</script>
