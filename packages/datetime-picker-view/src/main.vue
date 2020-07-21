<template>
  <wd-picker-view
    ref="pickerView"
    v-model="pickerValue"
    :columns="columns"
    :visible-item-count="visibleItemCount"
    :loading="loading"
    :arrow-html="arrowHtml"
    :column-change="onColumnChange"
    @change="handleChange"
  />
</template>

<script>
import DatetimePickerView from 'wot-design/src/mixins/datetimePickerView'
import WdPickerView from 'wot-design/packages/picker-view'

export default {
  name: 'WdDatetimePickerView',
  components: {
    WdPickerView
  },
  mixins: [DatetimePickerView],
  watch: {
    innerValue () {
      this.$emit('input', this.innerValue)
    }
  },
  methods: {
    handleChange (pickerView, value, index) {
      this.$emit('change', pickerView, value, index)
    }
  }
}
</script>
