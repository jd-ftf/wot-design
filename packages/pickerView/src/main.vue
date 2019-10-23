<template>
  <div class="jm-picker-view">
    <div class="jm-picker-view__columns" :style="{ 'height': itemHeight * visibleItemCount + 'px' }">
      <jm-picker-view-column
        v-for="(column, index) in formatColumns"
        :key="index"
        :visible-item-count="visibleItemCount"
        :item-height="itemHeight"
        :arrow-html="arrowHtml"
        :value="value instanceof Array ? value[index] : value"
        :initial-data="column"
        :value-key="valueKey"
        :label-key="labelKey"
        @change="onChange(index)"
      />
      <div class="jm-picker-view__mask" :style="{ 'background-size': `100% ${itemHeight * (visibleItemCount - 1) / 2}px` }"></div>
      <div class="jm-picker-view__select" :style="{ 'height': `${itemHeight}px` }"></div>
      <div v-if="loading" class="jm-picker-view__loading">
        <jm-loading size="30px" color="#0083ff" />
      </div>
    </div>
  </div>
</template>

<script>
import locale from '@/mixins/locale'
import pickerViewProps from './pickerViewProps'
import JmPickerViewColumn from './pickerColumn'
import JmLoading from 'jm-design/loading'

export default {
  name: 'JmPickerView',
  mixins: [locale],
  components: {
    JmPickerViewColumn,
    JmLoading: JmLoading.Indicator
  },
  data () {
    return {
      children: []
    }
  },
  props: {
    ...pickerViewProps,
    value: [String, Array],
    columnChange: Function,
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    }
  },
  computed: {
    isSingle () {
      return this.columns.length && !(this.columns[0] instanceof Array)
    },
    formatColumns () {
      return this.isSingle ? [this.columns] : this.columns
    }
  },
  watch: {
    columns () {
      let formatColumns = this.isSingle ? [this.columns] : this.columns
      formatColumns.forEach((data, index) => {
        this.setColumnData(index, data)
      })
    }
  },
  methods: {
    onChange (columnIndex) {
      this.columnChange && this.columnChange(this, this.getColumnItem(columnIndex), columnIndex)
      if (this.isSingle) {
        let value = this.getColumnValue(columnIndex)
        this.$emit('input', value)
        this.$emit('change', this, value, this.getColumnIndex(columnIndex))
      } else {
        let value = this.getValues()
        this.$emit('input', value)
        this.$emit('change', this, value, columnIndex)
      }
    },
    getValues () {
      return this.children.map(column => {
        return column.getValue()
      })
    },
    setValues (values) {
      this.children.forEach((column, index) => {
        column.setValue(values[index])
      })
    },
    getLabels () {
      return this.children.map(column => {
        return column.getLabel()
      })
    },
    getColumnValue (columnIndex) {
      const column = this.children[columnIndex]
      return column && column.getValue()
    },
    getColumnIndex (columnIndex) {
      return (this.children[columnIndex] || {}).selectedIndex
    },
    getColumnItem (columnIndex) {
      const column = this.children[columnIndex]

      if (column) {
        return column.data[column.selectedIndex]
      }
    },
    getColumnData (columnIndex) {
      return (this.children[columnIndex] || {}).data
    },
    setColumnData (columnIndex, data) {
      const column = this.children[columnIndex]
      if (column && JSON.stringify(column.data) !== JSON.stringify(data)) {
        column.data = data
        column.setIndex(0, false)
      }
    },
    onCancel () {
      this.$emit('cancel')
    },
    onConfirm () {
      this.children.forEach(column => column.onTranstionEnd())
      if (this.isSingle) {
        this.$emit('confirm', this, this.getColumnValue(0), this.getColumnIndex(0))
      } else {
        let allIndex = this.children.map(column => {
          return column.selectedIndex
        })
        this.$emit('confirm', this, this.getValues(), allIndex)
      }
    }
  }
}
</script>
