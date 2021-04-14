<template>
  <div class="wd-card" :class="{'is-rectangle': type == 'rectangle'}">
    <div class="wd-card__title-content">
      <div class="wd-card__title" v-if="title || this.$slots['title']">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </div>
    <div class="wd-card__content">
      <slot></slot>
    </div>
    <div class="wd-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WdCard',
  data () {
    return {}
  },
  props: {
    title: String,
    type: String
  }
}
</script>
