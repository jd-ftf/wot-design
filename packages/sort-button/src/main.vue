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
        <wd-icon
          v-show="value !== -1"
          name="arrow-up"
          class="wd-sort-button__icon wd-sort-button__icon--up"
        />
        <wd-icon
          v-show="value !== 1"
          name="arrow-down"
          class="wd-sort-button__icon wd-sort-button__icon--down"
        />
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
    allowReset: Boolean
  },
  data () {
    return {
      showUp: true,
      showDown: true
    }
  },
  methods: {
    handleClick () {
      let { value, allowReset } = this
      if (value === 1) {
        // 无论单价头还是双箭头，只要点击就应该由升序切换到降序
        value = -1
      } else if (allowReset && value === -1) {
        // 双箭头并且允许重置时，只要点击就应该由降序切换到重置状态
        value = 0
      } else if (value === -1) {
        // 不允许重置，只要点击就应该由降序切换到升序
        value = 1
      } else {
        // 不管是否允许重置，只要点击就应该由 重置状态 切换到升序
        value = 1
      }
      this.$emit('input', value)
    }
  }
}
</script>
