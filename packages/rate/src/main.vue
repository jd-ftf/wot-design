<template>
  <ul class="wd-rate">
    <li
      v-for="(item, index) in rateList"
      :key="index"
      class="wd-rate__item"
      :style="{ 'margin': '0 ' + space }"
      @click="changeRate(index)">
      <i
        :class="icon"
        class="wd-rate__item-star"
        :style="{ 'width': size, 'height': size, 'font-size': size, 'color': disabled ? disabledColor : color }"></i>
      <i
        :class="activeIcon"
        class="wd-rate__item-star wd-rate__item-star--active"
        :style="{ 'width': item, 'height': size, 'font-size': size, 'color': disabled ? disabledColor : activeColor }"></i>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'WdRate',
  props: {
    num: {
      type: Number,
      default: 5
    },
    value: Number,
    readonly: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '16px'
    },
    space: {
      type: String,
      default: '2px'
    },
    color: {
      type: String,
      default: '#c5c5c5'
    },
    activeColor: {
      type: String,
      default: '#e2231a'
    },
    icon: {
      type: String,
      default: 'wd-icon-chat' // Todo 替换图标
    },
    activeIcon: {
      type: String,
      default: 'wd-icon-chat' // Todo 替换图标
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledColor: {
      type: String,
      default: '#c5c5c5'
    }
  },
  computed: {
    rateList () {
      let rateList = []

      var fullLength = Math.ceil(this.value) - 1

      for (let i = 0; i < this.num; i++) {
        if (i < fullLength) {
          rateList.push('100%')
        } else if (i === fullLength) {
          let rate = this.value - fullLength
          rateList.push(rate * 100 + '%')
        } else {
          rateList.push('0')
        }
      }

      return rateList
    }
  },
  methods: {
    changeRate (index) {
      if (!this.readonly && !this.disabled) {
        this.$emit('input', index + 1)
      }
    }
  }
}
</script>
