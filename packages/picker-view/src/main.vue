<template>
  <div class="wd-picker-view">
    <div class="wd-picker-view__columns" :style="`height: ${columnsHeight}px`">
      <wd-picker-view-column
        v-for="(column, index) in formatColumns"
        :key="index"
        :arrow-html="arrowHtml"
        :value="value instanceof Array ? value[index] : value"
        :initial-data="column"
        :value-key="valueKey"
        :label-key="labelKey"
        @change="onChange(index)"
      />
      <div class="wd-picker-view__mask" :style="{ 'background-size': '100% 45%' }"></div>
      <div v-if="loading" class="wd-picker-view__loading">
        <wd-loading type="circular-ring" :color="loadingColor" />
      </div>
    </div>
  </div>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'
import pickerViewProps from './pickerViewProps'
import WdPickerViewColumn from './pickerColumn'
import WdLoading from 'wot-design/packages/loading'

export default {
  name: 'WdPickerView',
  mixins: [locale],
  components: {
    WdPickerViewColumn,
    WdLoading
  },

  data () {
    return {
      children: []
    }
  },

  props: {
    ...pickerViewProps,
    value: [String, Number, Boolean, Array],
    columnChange: Function,
    columns: {
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
    },
    value: {
      handler (val) {
        if ((!val || (val instanceof Array && !val.length)) && this.columns.length) {
          this.$nextTick(() => {
            this.onChange(0)
          })
        }
      },
      immediate: true
    }
  },

  methods: {
    onChange (columnIndex) {
      if (this.columnChange) {
        // 列项修改参数：当前pickerView实例、要修改的列项数组、列项、回调函数（执行修改）
        this.columnChange(this, this.getColumnItem(columnIndex) || {}, columnIndex, () => {
          this.handleChange(columnIndex)
        })
      } else {
        this.handleChange(columnIndex)
      }
    },

    handleChange (columnIndex) {
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

    getItems () {
      return this.children.map(column => {
        return column.data[column.selectedIndex]
      })
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

    getColumnsData () {
      return this.children.map(column => {
        return column.data
      })
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
