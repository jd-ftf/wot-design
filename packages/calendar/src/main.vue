<template>
  <div class="wd-calendar">
    <div class="wd-calendar__field" @click="open">
      <slot>
        <div
          class="wd-calendar__cell"
          :class="[
            {
            'is-disabled': disabled,
            'is-readonly': readonly,
            'is-align-right': alignRight,
            'is-error': error
            },
            size ? `is-${size}` : ''
          ]"
        >
          <div
            v-if="label || $slots.label"
            class="wd-calendar__label"
            :class="{
              'is-required': required
            }"
            :style="labelWidth ? `min-width: ${labelWidth}; max-width: ${labelWidth}` : ''"
          >
            <slot name="label">
              {{ label }}
            </slot>
          </div>
          <div
            class="wd-calendar__value"
            :class="{
              'wd-calendar__value--placeholder': (!value || (value instanceof Array && !value.length))
            }"
          >{{ ((!value || (value instanceof Array && !value.length)) ? placeholder : showValue) || t('wd.calendar.placeholder') }}</div>
          <i v-if="!disabled && !readonly" class="wd-calendar__arrow wd-icon-arrow-right"></i>
        </div>
      </slot>
    </div>
    <wd-action-sheet
      v-model="pickerShow"
      :duration="250"
      :close-on-click-modal="closeOnClickModal"
      :close-on-popstate="closeOnPopstate"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @close="close"
    >
      <div class="wd-calendar__header">
        <div v-if="!showTypeSwitch && shortcuts.length === 0" class="wd-calendar__title">{{ title || t('wd.calendar.title') }}</div>
        <div v-if="showTypeSwitch" class="wd-calendar__tabs">
          <wd-tabs ref="tabs" v-model="currentTab" @change="handleTypeChange">
            <wd-tab :title="t('wd.calendar.day')" />
            <wd-tab :title="t('wd.calendar.week')" />
            <wd-tab :title="t('wd.calendar.month')" />
          </wd-tabs>
        </div>
        <div v-if="shortcuts.length > 0" class="wd-calendar__shortcuts">
          <wd-tag
            v-for="(item, index) in shortcuts"
            :key="item.text"
            class="wd-calendar__tag"
            type="primary"
            plain
            round
            @click="handleShortcutClick(index)"
          >{{ item.text }}</wd-tag>
        </div>
        <i class="wd-calendar__close wd-icon-add" @click="close"></i>
      </div>
      <div
        class="wd-calendar__view"
        :class="{
          'is-show-confirm': showConfirm
        }"
      >
        <div v-if="currentType.indexOf('range') > -1" class="wd-calendar__range-label" :class="{ 'is-monthrange': currentType === 'monthrange' }">
          <div class="wd-calendar__range-label-item" :class="{ 'is-placeholder': !calendarValue || !calendarValue[0] }" style="text-align: right">
            {{ rangeLabel[0] }}
          </div>
          <div class="wd-calendar__range-sperator">/</div>
          <div class="wd-calendar__range-label-item" :class="{ 'is-placeholder': !calendarValue || !calendarValue[1] }">
            {{ rangeLabel[1] }}
          </div>
        </div>
        <wd-calendar-view
          ref="calendarView"
          v-model="calendarValue"
          :type="currentType"
          :min-date="minDate"
          :max-date="maxDate"
          :first-day-of-week="firstDayOfWeek"
          :formatter="formatter"
          :panel-height="panelHeight"
          :max-range="maxRange"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          :time-filter="timeFilter"
          :hide-second="hideSecond"
          :show-panel-title="currentType.indexOf('range') === -1"
          @change="handleChange"
        />
      </div>
      <div v-if="showConfirm" class="wd-calendar__confirm">
        <wd-button block :disabled="confirmBtnDisabled" @click="handleConfirm">{{ confirmText || t('wd.calendar.confirm') }}</wd-button>
      </div>
    </wd-action-sheet>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import locale from 'wot-design/src/mixins/locale'
import WdActionSheet from 'wot-design/packages/action-sheet'
import WdTabs from 'wot-design/packages/tabs'
import WdTab from 'wot-design/packages/tab'
import WdCalendarView from 'wot-design/packages/calendar-view'
import WdTag from 'wot-design/packages/tag'
import WdButton from 'wot-design/packages/button'
import { getWeekNumber, dateToTimestamp } from 'wot-design/packages/calendar-view/src/utils'
import { padZero, isEqual } from 'wot-design/src/utils'

const current = new Date()
const currentYear = current.getFullYear()
const currentMonth = current.getMonth()
const currentDay = current.getDate()

const defaultDisplayFormat = function (value, type) {
  switch (type) {
    case 'date':
      return dayjs(value).format('YYYY-MM-DD')
    case 'dates':
      return value.map(item => {
        return item ? dayjs(item).format('YYYY-MM-DD') : ''
      }).join(', ')
    case 'daterange': {
      const startLabel = value[0] ? dayjs(value[0]).format('YYYY-MM-DD') : this.t('wd.calendar.startTime')
      const endLabel = value[1] ? dayjs(value[1]).format('YYYY-MM-DD') : this.t('wd.calendar.endTime')
      return `${startLabel} ${this.t('wd.calendar.to')} ${endLabel}`
    }
    case 'datetime':
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    case 'datetimerange': {
      const startLabel = value[0] ? dayjs(value[0]).format(this.t('wd.calendar.timeFormat')) : this.t('wd.calendar.startTime')
      const endLabel = value[1] ? dayjs(value[1]).format(this.t('wd.calendar.timeFormat')) : this.t('wd.calendar.endTime')
      return `${startLabel} ${this.t('wd.calendar.to')}\n${endLabel}`
    }
    case 'week': {
      const year = new Date(value).getFullYear()
      const week = getWeekNumber(value)
      return this.t('wd.calendar.weekFormat', { week: padZero(week), year })
    }
    case 'weekrange': {
      const year1 = new Date(value[0]).getFullYear()
      const week1 = getWeekNumber(value[0])
      const year2 = new Date(value[1]).getFullYear()
      const week2 = getWeekNumber(value[1])
      const startLabel = value[0] ? this.t('wd.calendar.weekFormat', { week: padZero(week1), year: year1 }) : this.t('wd.calendar.startWeek')
      const endLabel = value[1] ? this.t('wd.calendar.weekFormat', { week: padZero(week2), year: year2 }) : this.t('wd.calendar.endWeek')
      return `${startLabel} - ${endLabel}`
    }
    case 'month':
      return dayjs(value).format('YYYY / MM')
    case 'monthrange': {
      const startLabel = value[0] ? dayjs(value[0]).format('YYYY / MM') : this.t('wd.calendar.startMonth')
      const endLabel = value[1] ? dayjs(value[1]).format('YYYY / MM') : this.t('wd.calendar.endMonth')
      return `${startLabel} ${this.t('wd.calendar.to')} ${endLabel}`
    }
  }
}

const formatRange = function (value, rangeType, type) {
  switch (type) {
    case 'daterange': {
      if (!value) {
        return rangeType === 'end' ? this.t('wd.calendar.endTime') : this.t('wd.calendar.startTime')
      }
      return dayjs(value).format(this.t('wd.calendar.dateFormat'))
    }
    case 'datetimerange': {
      if (!value) {
        return rangeType === 'end' ? this.t('wd.calendar.endTime') : this.t('wd.calendar.startTime')
      }
      return dayjs(value).format(this.t('wd.calendar.timeFormat'))
    }
    case 'weekrange': {
      if (!value) {
        return rangeType === 'end' ? this.t('wd.calendar.endWeek') : this.t('wd.calendar.startWeek')
      }
      const date = new Date(value)
      const year = date.getFullYear()
      const week = getWeekNumber(value)
      return this.t('wd.calendar.weekFormat', { year, week })
    }
    case 'monthrange': {
      if (!value) {
        return rangeType === 'end' ? this.t('wd.calendar.endMonth') : this.t('wd.calendar.startMonth')
      }
      return dayjs(value).format(this.t('wd.calendar.monthFormat'))
    }
  }
}

export default {
  name: 'WdCalendar',
  mixins: [locale],
  components: {
    WdTabs,
    WdTab,
    WdCalendarView,
    WdTag,
    WdActionSheet,
    WdButton
  },
  props: {
    value: null,
    type: {
      type: String,
      default: 'date'
    },
    minDate: {
      type: Date,
      default () {
        return new Date(currentYear, currentMonth - 6, currentDay)
      }
    },
    maxDate: {
      type: Date,
      default () {
        return new Date(currentYear, currentMonth + 6, currentDay, 23, 59, 59)
      }
    },
    firstDayOfWeek: {
      type: Number,
      default: 0
    },
    formatter: Function,
    maxRange: Number,
    rangePrompt: String,
    allowSameDay: Boolean,
    defaultTime: [String, Array],
    timeFilter: Function,
    hideSecond: Boolean,
    label: String,
    labelWidth: String,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: String,
    title: String,
    alignRight: Boolean,
    error: Boolean,
    required: Boolean,
    size: String,
    center: Boolean,
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    confirmText: String,
    displayFormat: Function,
    innerDisplayFormat: Function,
    ellipsis: Boolean,
    showTypeSwitch: Boolean,
    shortcuts: {
      type: Array,
      default () {
        return []
      }
    },
    onShortcutsClick: Function,
    beforeConfirm: Function,
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pickerShow: false,
      calendarValue: '',
      lastCalendarValue: '',
      currentTab: 0,
      lastTab: 0,
      currentType: 'date',
      lastCurrentType: 'date',
      inited: false,
      isChange: false,
      showValue: ''
    }
  },
  computed: {
    panelHeight () {
      return this.showConfirm ? 338 : 400
    },
    confirmBtnDisabled () {
      let confirmBtnDisabled = false

      // 范围选择未选择满，或者多日期选择未选择日期，按钮置灰不可点击
      if ((this.type.indexOf('range') > -1 && (!this.calendarValue || !this.calendarValue[0] || !this.calendarValue[1])) ||
        (this.type === 'dates' && (!this.calendarValue || this.calendarValue.length === 0)) || !this.calendarValue) {
        confirmBtnDisabled = true
      }

      return confirmBtnDisabled
    },
    rangeLabel () {
      if (this.currentType.indexOf('range') === -1) return []

      const [start, end] = this.calendarValue || []
      return ([start, end]).map((item, index) => {
        return (this.innerDisplayFormat || formatRange.bind(this))(item, index === 0 ? 'start' : 'end', this.currentType)
      })
    }
  },
  watch: {
    value: {
      handler (val, oldVal) {
        if (isEqual(dateToTimestamp(val), dateToTimestamp(oldVal))) return

        this.calendarValue = val instanceof Array ? val.slice(0) : val

        this.$nextTick(() => {
          this.setShowValue()
          this.scrollIntoView()
        })
      },
      immediate: true
    },
    type: {
      handler (val) {
        if (this.showTypeSwitch) {
          const tabs = ['date', 'week', 'month']
          const rangeTabs = ['daterange', 'weekrange', 'monthrange']

          const index = val.indexOf('range') > -1 ? (rangeTabs.indexOf(val) || 0) : tabs.indexOf(val)
          this.currentTab = index
        }

        this.currentType = val
        this.$nextTick(() => {
          this.setShowValue()
        })
      },
      immediate: true
    },
    displayFormat () {
      this.setShowValue()
    }
  },
  methods: {
    scrollIntoView () {
      this.$refs.calendarView.scrollIntoView()
    },
    // 对外暴露方法
    open () {
      const { disabled, readonly } = this

      if (disabled || readonly) return

      this.pickerShow = true
      this.lastCalendarValue = this.calendarValue instanceof Array ? this.calendarValue.slice(0) : this.calendarValue
      this.lastTab = this.currentTab
      this.lastCurrentType = this.currentType

      setTimeout(() => {
        this.scrollIntoView()

        if (this.showTypeSwitch) {
          this.$refs.tabs.lineScrollIntoView()
          this.$refs.tabs.setLineStyle(false)
        }
      }, 250)
    },
    // 对外暴露方法
    close () {
      this.pickerShow = false

      if (this.isChange) {
        setTimeout(() => {
          this.calendarValue = this.lastCurrentType instanceof Array ? this.lastCalendarValue.slice(0) : this.lastCalendarValue
          this.currentTab = this.lastTab
          this.currentType = this.lastCurrentType
        }, 250)
      }
      this.$emit('cancel')
    },
    handleTypeChange (index) {
      this.isChange = true
      const tabs = ['date', 'week', 'month']
      const rangeTabs = ['daterange', 'weekrange', 'monthrange']
      const type = this.type.indexOf('range') > -1 ? rangeTabs[index] : tabs[index]
      this.currentType = type
    },
    handleChange (value) {
      this.isChange = true
      this.$emit('change', value)

      if (!this.showConfirm && !this.confirmBtnDisabled) {
        this.handleConfirm()
      }
    },
    setShowValue () {
      if ((!(this.value instanceof Array) && this.value) || (this.value instanceof Array && this.value.length)) {
        this.showValue = (this.displayFormat || defaultDisplayFormat.bind(this))(this.value, this.currentType)
      }
    },
    handleConfirm () {
      if (this.beforeConfirm) {
        this.beforeConfirm({
          value: this.calendarValue,
          resolve: (isPAss) => {
            isPAss && this.onConfirm()
          }
        })
      } else {
        this.onConfirm()
      }
    },
    onConfirm () {
      this.isChange = false
      this.pickerShow = false
      this.setShowValue()
      this.$emit('input', this.calendarValue)
      this.$emit('confirm', this.calendarValue)
    },
    handleShortcutClick (index) {
      this.isChange = true
      if (this.onShortcutsClick && typeof this.onShortcutsClick === 'function') {
        const calendarValue = this.onShortcutsClick({
          item: this.shortcuts[index],
          index
        })
        this.calendarValue = calendarValue
      }

      if (!this.showConfirm) {
        this.handleConfirm()
      }
    }
  }
}
</script>
