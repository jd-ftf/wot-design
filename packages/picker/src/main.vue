<template>
  <div class="jm-picker">
    <div v-if="showToolbar" class="jm-picker__toolbar">
      <button class="jm-picker__action jm-picker__action--cancel">{{ cancelButtonText || t('jmd.picker.cancel') }}</button>
      <span v-if="title" class="jm-picker__title">{{ title }}</span>
      <button class="jm-picker__action">{{ confirmButtonText || t('jmd.picker.finish') }}</button>
    </div>
    <div class="jm-picker__columns" :style="{ 'height': itemHeight * visibleItemCount + 'px' }">
      <jm-picker-column
        v-for="(column, index) in formatColumns"
        :key="index"
        :visible-item-count="visibleItemCount"
        :item-height="itemHeight"
        :arrow-html="arrowHtml"
        :default-index="isSingle ? defaultIndex : column.defaultIndex"
        :values="column.values"
      />
      <div class="jm-picker__mask" :style="{ 'background-size': `100% ${itemHeight * (visibleItemCount - 1) / 2}px` }"></div>
      <div class="jm-picker__select"></div>
    </div>
  </div>
</template>

<script>
import locale from '@/mixins/locale'
import pickerProps from './pickerProps'
import JmPickerColumn from './pickerColumn'

export default {
  name: 'JmPicker',
  mixins: [locale],
  components: {
    JmPickerColumn
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
  }
}
</script>
