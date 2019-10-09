<template>
  <div class="jm-picker-view">
    <div v-if="showToolbar" class="jm-picker-view__toolbar">
      <button class="jm-picker-view__action jm-picker-view__action--cancel" @click="onCancel">{{ cancelButtonText || t('jmd.pickerView.cancel') }}</button>
      <span v-if="title" class="jm-pickerview__title">{{ title }}</span>
      <button class="jm-pickerview__action" @click="onConfirm">{{ confirmButtonText || t('jmd.pickerView.done') }}</button>
    </div>
    <div class="jm-picker-view__columns" :style="{ 'height': itemHeight * visibleItemCount + 'px' }">
      <jm-picker-view-column
        v-for="(column, index) in formatColumns"
        :key="index"
        :visible-item-count="visibleItemCount"
        :item-height="itemHeight"
        :arrow-html="arrowHtml"
        :default-index="isSingle ? defaultIndex : column.defaultIndex"
        :initial-values="column.values"
        @change="onChange(index)"
      />
      <div class="jm-picker-view__mask" :style="{ 'background-size': `100% ${itemHeight * (visibleItemCount - 1) / 2}px` }"></div>
      <div class="jm-picker-view__select" :style="{ 'height': `${itemHeight}px` }"></div>
    </div>
  </div>
</template>

<script>
import locale from '@/mixins/locale'
import pickerProps from './pickerProps'
import JmPickerViewColumn from './pickerColumn'

export default {
  name: 'JmPickerView',
  mixins: [locale],
  components: {
    JmPickerViewColumn
  },
  data () {
    return {
      children: []
    }
  },
  props: {
    ...pickerProps,
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    valueKey: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    isSingle () {
      return this.columns.length && !this.columns[0].value
    },
    formatColumns () {
      return this.isSingle ? [{ values: this.columns }] : this.columns
    }
  },
  methods: {
    onChange (columnIndex) {
      if (this.isSingle) {
        this.$emit('change', this, this.getColumnValue(columnIndex), this.getColumnIndex(columnIndex))
      } else {
        this.$emit('change', this, this.getValues(), columnIndex)
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
    getColumnValue (index) {
      const column = this.children[index]
      return column && column.getValue()
    },
    setColumnValue (index, value) {
      const column = this.children[index]
      column && column.setValue(value)
    },
    getColumnIndex (index) {
      return (this.children[index] || {}).selectedIndex
    },
    setColumnIndex (columnIndex, itemIndex) {
      const column = this.children[columnIndex]
      column && column.setIndex(itemIndex)
    },
    getColumnValues (columnIndex) {
      return (this.children[columnIndex] || {}).values
    },
    setColumnValues (columnIndex, values) {
      const column = this.children[columnIndex]
      column && (column.values = values)
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
