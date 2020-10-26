<template>
  <ul class="wd-rate">
    <li
      v-for="(item, index) in rateList"
      :key="index"
      class="wd-rate__item"
      :style="{ 'margin-right': index == rateList.length - 1 ? 0 : space }"
      @click="changeRate(index)"
    >
      <i
        :class="icon"
        class="wd-rate__item-star"
        :style="{ 'width': size, 'height': size, 'font-size': size, 'background': color }"
      ></i>
      <i
        :class="activeIcon"
        class="wd-rate__item-star wd-rate__item-star--active"
        :style="{ 'width': item, 'height': size, 'font-size': size, 'background': disabled ? disabledColor : activeValue }"
      ></i>
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
      default: '4px'
    },
    color: {
      type: String,
      default: '#E8E8E8'
    },
    activeColor: {
      type: [String, Array],
      default: 'linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)'
    },
    icon: {
      type: String,
      default: 'wd-icon-star-on'
    },
    activeIcon: {
      type: String,
      default: 'wd-icon-star-on'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledColor: {
      type: String,
      default: 'linear-gradient(315deg, rgba(177,177,177,1) 0%,rgba(199,199,199,1) 100%)'
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
          let rate = (this.value - fullLength) > 0.5 ? 1 : 0.5
          rateList.push(rate * 100 + '%')
        } else {
          rateList.push('0')
        }
      }

      return rateList
    },
    activeValue () {
      if (Array.isArray(this.activeColor) && this.activeColor.length) {
        return this.value <= 3 ? this.activeColor[0] : this.activeColor[1]
      } else {
        return this.activeColor
      }
    }
  },
  methods: {
    changeRate (index) {
      if (!this.readonly && !this.disabled) {
        this.$emit('input', index + 1)
        this.$emit('change', index + 1)
      }
    }
  }
}
</script>
