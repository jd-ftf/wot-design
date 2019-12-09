<template>
  <ul
    class="jm-picker-view-column"
    :style="{
      'transform': `translate3d(0, ${offset + baseOffset}px, 0)`,
      'transition-duration': `${duration}ms`
    }"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @transitionend="onTranstionEnd"
  >
    <li
      v-for="(item, index) in data"
      :key="index"
      :class="{
        'jm-picker-view-column__item': 1,
        'jm-picker-view-column__item--active': index === activeIndex,
        'jm-picker-view-column__item--disabled': typeof item === 'string' ? false : item.disabled
      }"
      :style="{
        'height': itemHeight + 'px',
        'line-height': itemHeight + 'px'
      }"
      @click="selectItem(index)"
      v-html="arrowHtml ? getItemLabel(item) : ''"
    >
      {{ arrowHtml ? '' : getItemLabel(item) }}
    </li>
  </ul>
</template>

<script>
import touchMixin from '@/mixins/touch'
import { range } from '@/utils'

const SELECT_DURATION = 300 // 选择滑动持续时间
const MOMENTUM_LIMIT_DURATION = 300 // 惯性滑动限制最大时间
const MOMENTUM_LIMIT_DISTANCE = 15 // 惯性滑动限制最大距离
const MOMENTUM_DURATION = 1000 // 惯性滑动持续时间

export default {
  name: 'JmPickerViewColumn',
  mixins: [touchMixin],
  data () {
    return {
      offset: 0,
      activeIndex: 0,
      selectedIndex: 0,
      duration: 0,
      moving: false,
      transitionEndTrigger: '',
      data: this.initialData
    }
  },
  props: {
    arrowHtml: Boolean,
    visibleItemCount: Number,
    itemHeight: Number,
    initialData: {
      type: Array,
      default () {
        return []
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    value: [String, Number],
    labelKey: String,
    valueKey: String
  },
  computed: {
    length () {
      return this.data.length
    },
    baseOffset () {
      return this.itemHeight * (this.visibleItemCount - 1) / 2
    }
  },
  watch: {
    value: {
      handler () {
        let selectedIndex = 0
        for (let i = 0; i < this.length; i++) {
          if (this.getItemValue(this.data[i]) === this.value) {
            selectedIndex = i
            break
          }
        }
        this.setIndex(selectedIndex, false)
      },
      immediate: true
    }
  },
  methods: {
    getItemLabel (item) {
      return typeof item === 'object' && this.labelKey in item ? item[this.labelKey] : item
    },
    getItemValue (item) {
      return typeof item === 'object' && this.valueKey in item ? item[this.valueKey] : this.getItemLabel(item)
    },
    adjustIndex (index) {
      index = range(index, 0, this.length)

      for (let i = index; i < this.length; i++) {
        if (typeof this.data[i] !== 'object' || !this.data[i].disabled) return i
      }

      for (let i = this.length - 1; i >= index; i--) {
        if (typeof this.data[i] !== 'object' || !this.data[i].disabled) return i
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
        this.activeIndex = index
        if (this.selectedIndex !== index) {
          this.selectedIndex = index

          if (userAction) {
            this.$emit('change')
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
      this.touchStart(event)

      this.startOffset = this.offset
      this.duration = 0
      this.transitionEndTrigger = null
      this.startTime = Date.now()
      this.momentumOffset = this.startOffset
    },
    onTouchMove (event) {
      this.moving = true
      this.touchMove(event)

      if (this.direction === 'vertical') {
        event.preventDefault()
      }

      this.offset = range(this.startOffset + this.deltaY, -this.itemHeight * this.length, this.itemHeight)
      this.activeIndex = this.getIndexByOffset(this.offset)
      const now = Date.now()

      if (now - this.startTime > MOMENTUM_LIMIT_DURATION) {
        this.startTime = now
        this.momentumOffset = this.offset
      }
    },
    onTouchEnd (event) {
      const distance = this.offset - this.momentumOffset
      const duration = Date.now() - this.startTime
      const shouldMomentum = Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE && duration < MOMENTUM_LIMIT_DURATION

      if (shouldMomentum) {
        this.momentum(distance, duration)
        return
      }

      const index = this.getIndexByOffset(this.offset)
      this.moving = false
      this.duration = SELECT_DURATION
      this.setIndex(index)
    },
    momentum (distane, duration) {
      const speed = distane / duration
      const momentumDistance = this.offset + speed * MOMENTUM_DURATION
      const nextIndex = this.getIndexByOffset(momentumDistance)

      this.duration = MOMENTUM_DURATION
      this.setIndex(nextIndex)
    },
    onTranstionEnd () {
      this.moving = false
      this.duration = 0

      if (this.transitionEndTrigger) {
        this.transitionEndTrigger()
        this.transitionEndTrigger = null
      }
    },
    getIndexByOffset (offset) {
      return range(Math.round(-offset / this.itemHeight), 0, this.length - 1)
    },
    getValue () {
      return this.getItemValue(this.data[this.selectedIndex])
    },
    getLabel () {
      return this.getItemLabel(this.data[this.selectedIndex])
    },
    setValue (value) {
      for (let i = 0; i < this.length; i++) {
        if (this.getItemValue(this.data[i]) === value) {
          this.setIndex(i, false)
          return
        }
      }
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
