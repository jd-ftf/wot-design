<template>
  <div class="wd-year-panel">
    <div v-if="showPanelTitle" class="wd-year-panel__title">
      {{ title }}
    </div>
    <div
      ref="container"
      class="wd-year-panel__container"
      :style="{
        height: (panelHeight || 378) + (showPanelTitle ? 26 : 16) + 'px'
      }"
    >
      <year
        v-for="item in years"
        ref="years"
        :key="item.getTime()"
        :type="type"
        :date="item"
        :value="value"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        :max-range="maxRange"
        :range-prompt="rangePrompt"
        :allow-same-day="allowSameDay"
        :default-time="defaultTime"
        @change="handleDateChange"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import locale from 'wot-design/src/mixins/locale'
import { getType, isEqual } from 'wot-design/src/utils'
import Year from './year'
import { compareYear, getYears, dateToTimestamp } from './utils'

export default {
  mixins: [locale],
  components: {
    Year
  },
  props: {
    type: String,
    value: null,
    minDate: Date,
    maxDate: Date,
    formatter: Function,
    maxRange: Number,
    rangePrompt: String,
    allowSameDay: Boolean,
    showPanelTitle: Boolean,
    defaultTime: Array,
    panelHeight: Number
  },
  data () {
    return {
      title: ''
    }
  },
  computed: {
    years () {
      return getYears(this.minDate, this.maxDate)
    }
  },
  mounted () {
    if (this.showPanelTitle) {
      this.onScroll()
      this.$refs.container.addEventListener('scroll', this.onScroll)
      this.$refs.container.addEventListener('touchmove', this.onScroll)
    }
    this.scrollIntoView()
  },
  beforeDestroy () {
    if (this.showPanelTitle) {
      this.$refs.container.removeEventListener('scroll', this.onScroll)
      this.$refs.container.removeEventListener('touchmove', this.onScroll)
    }
  },
  methods: {
    onScroll () {
      const { container, years } = this.$refs
      const top = container.scrollTop
      const bottom = top + container.clientHeight
      const heights = years.map(item => item.$el.clientHeight)
      const heightSum = heights.reduce((a, b) => a + b)

      if (bottom > heightSum && top > 0) return

      let currentYear
      let height = 0

      for (let i = 0, len = years.length; i < len; i++) {
        const visible = height < bottom && (height + heights[i]) > top

        if (visible && !currentYear) {
          currentYear = years[i]
        }

        height += heights[i]
      }

      if (currentYear) {
        this.title = dayjs(currentYear.date).format(this.t('wd.calendarView.yearTitle'))
      }
    },
    scrollIntoView () {
      let activeDate
      const type = getType(this.value)
      if (type === 'array') {
        activeDate = this.value[0]
      } else if (type === 'Date') {
        activeDate = this.value
      }

      if (!activeDate) {
        activeDate = new Date()
      }

      this.years.some((year, index) => {
        if (compareYear(year, activeDate) === 0) {
          const { container, years } = this.$refs
          container.scrollTop = years[index].$el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
          return true
        }

        return false
      })
    },
    handleDateChange (value) {
      if (!isEqual(dateToTimestamp(value), dateToTimestamp(this.value))) {
        this.$emit('change', value)
      }
    }
  }
}
</script>
