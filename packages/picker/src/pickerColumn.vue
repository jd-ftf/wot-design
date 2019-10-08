<template>
  <ul
    class="jm-picker-column"
    :style="{
      'transform': `translate3d(0, ${offset + baseOffset}px, 0)`,
      'transition-duration': `${duration}ms`
    }"

  >
    <li
      v-for="(item, index) in values"
      :key="index"
      :class="{
        'jm-picker-column__item': 1,
        'jm-picker-column__item--active': index === selectedIndex,
        'jm-picker-column__item--disabled': typeof item === 'string' ? false : item.disabled
      }"
      :style="{
        'height': itemHeight + 'px',
        'line-height': itemHeight + 'px'
      }"
      @click="selectItem(index)"
    >
      {{ typeof item === 'string' ? item : item.text }}
    </li>
  </ul>
</template>

<script>
const SELECT_DURATION = 300

export default {
  name: 'JmPickerColumn',
  data () {
    return {
      offset: 0,
      selectedIndex: 0,
      duration: 0,
      moving: false,
      transitionEndTrigger: ''
    }
  },
  props: {
    arrowHtml: Boolean,
    visibleItemCount: Number,
    itemHeight: Number,
    values: {
      type: Array,
      default () {
        return []
      }
    },
    defaultIndex: Number
  },
  computed: {
    length () {
      return this.values.length
    },
    baseOffset () {
      return this.itemHeight * (this.visibleItemCount - 1) / 2
    }
  },
  watch: {
    defaultIndex: {
      handler () {
        this.setIndex(this.defaultIndex, false)
      },
      immediate: true
    }
  },
  methods: {
    range (value, min, max) {
      return Math.min(Math.max(value, min), max)
    },
    adjustIndex (index) {
      index = this.range(index, 0, this.length)

      for (let i = index; i < this.length; i++) {
        if (typeof this.values[i] !== 'object' || !this.values[i].disabled) return i
      }

      for (let i = this.length - 1; i >= index; i--) {
        if (typeof this.values[i] !== 'object' || !this.values[i].disabled) return i
      }
    },
    selectItem (index) {
      if (this.moving) return

      this.duration = SELECT_DURATION
      this.setIndex(index)
    },
    setIndex (index, userAction = true) {
      index = this.adjustIndex(index)
      this.offset = -index * this.itemHeight

      const trigger = () => {
        if (this.selectedIndex !== index) {
          this.selectedIndex = index

          if (userAction) {
            this.$emit('change', index)
          }
        }
      }

      if (this.moving) {
        this.transitionEndTrigger = trigger
      } else {
        trigger()
      }
    },
    onTouchStart (event) {

    }
  },
  created () {
    if (this.$parent.children) {
      this.$parent.children.push(this)
    }
  },
  destroyed () {
    const { children } = this.$parent

    if (children) {
      children.splice(children.indexOf(this), 1)
    }
  }
}
</script>
