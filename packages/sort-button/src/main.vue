<template>
  <div
    class="wd-sort-button"
    @click="handleClick"
  >
    <div class="wd-sort-button__wrapper">
      <div
        class="wd-sort-button__left"
        :class="{ 'is-active': value !== 0 }"
      >
        {{title}}
      </div>
      <div class="wd-sort-button__right" :class="{ 'is-active': value !== 0 }">
        <i v-show="value !== -1" class="wd-icon-arrow-up wd-sort-button__icon wd-sort-button__icon--up" />
        <i v-show="value !== 1" class="wd-icon-arrow-down wd-sort-button__icon wd-sort-button__icon--down" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WdSortButton',
  props: {
    title: String,
    value: {
      type: Number,
      value: 0,
      required: true
    },
    allowReset: Boolean,
    descFirst: Boolean
  },
  methods: {
    handleClick () {
      let { value, allowReset, descFirst } = this

      if (descFirst) {
        if (value === 0) {
          value = -1
        } else if (value === -1) {
          value = 1
        } else if (value === 1) {
          if (allowReset) {
            value = 0
          } else {
            value = -1
          }
        }
      } else {
        if (value === 0) {
          value = 1
        } else if (value === 1) {
          value = -1
        } else if (value === -1) {
          if (allowReset) {
            value = 0
          } else {
            value = 1
          }
        }
      }

      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>
