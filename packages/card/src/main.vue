<template>
  <div class="wd-card" :class="{'is-rectangle': type == 'rectangle'}">
    <div class="wd-card__title-content">
      <div
        class="wd-card__title"
        :class="{'is-rectangle': type == 'rectangle'}"
        v-if="title || this.$slots['title']"
      >
        <div v-if="title">{{ title }}</div>
        <slot v-else name="title"></slot>
      </div>
    </div>
    <div
      class="wd-card__content"
      :class="{'is-rectangle': type == 'rectangle'}"
    >
      <slot></slot>
    </div>
    <div class="wd-card__action">
      <slot name="action"></slot>
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
