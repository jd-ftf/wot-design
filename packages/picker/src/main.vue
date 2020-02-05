<template>
  <div class="wd-picker wd-field" :class="[ size ? `is-${size}` : '', error ? 'is-error' : '', alignRight ? 'is-align-right' : '' ]">
    <div
      class="wd-picker__field"
      :class="{
        'wd-picker__field--disabled': disabled
      }"
      @click="showPopup"
    >
      <div v-if="label || $slots.label" class="wd-picker__label" :style="labelWidth ? `min-width: ${labelWidth}; max-width: ${labelWidth}` : ''">
        <slot name="label">
          {{ label }}
        </slot>
      </div>
      <div class="wd-picker__value">{{ ((!value || (value instanceof Array && !value.length)) ? placeholder : showValue) || t('wd.picker.placeholder') }}</div>
      <i v-if="!disabled && !readonly" class="wd-picker__arrow wd-icon-arrow-right"></i>
    </div>
    <wd-popup v-model="popupShow" position="bottom" @click-modal="onCancel">
      <div class="wd-picker__toolbar">
        <button class="wd-picker__action wd-picker__action--cancel" @click="onCancel">{{ cancelButtonText || t('wd.picker.cancel') }}</button>
        <span v-if="title" class="wd-picker__title">{{ title }}</span>
        <button class="wd-picker__action" @click="onConfirm">{{ confirmButtonText || t('wd.picker.done') }}</button>
      </div>
      <wd-picker-view
        ref="pickerView"
        v-model="pickerValue"
        :columns="columns"
        :loading="loading"
        :arrow-html="arrowHtml"
        :visible-item-count="visibleItemCount"
        :item-height="itemHeight"
        :value-key="valueKey"
        :label-key="labelKey"
        :column-change="columnChange"
      />
    </wd-popup>
  </div>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'
import WdPopup from 'wot-design/packages/popup'
import WdPickerView from 'wot-design/packages/picker-view'
import pickerViewProps from '../../picker-view/src/pickerViewProps'
import pickerProps from './pickerProps'

export default {
  name: 'WdPicker',
  mixins: [locale],
  components: {
    WdPopup,
    WdPickerView
  },
  data () {
    return {
      showValue: '',
      popupShow: false,
      pickerValue: ''
    }
  },
  props: {
    ...pickerViewProps,
    ...pickerProps,
    value: [String, Array],
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
  watch: {
    value: {
      handler () {
        this.pickerValue = this.value

        this.$nextTick(() => {
          this.setShowValue()
        })
      },
      immediate: true
    }
  },
  methods: {
    showPopup () {
      if (this.disabled || this.readonly) return

      this.popupShow = true
    },
    onCancel () {
      this.pickerValue = this.value
      this.popupShow = false
      this.$emit('cancel')
    },
    onConfirm () {
      if (this.loading) {
        this.popupShow = false
        this.$emit('confirm')
        return
      }

      if (this.beforeConfirm) {
        this.beforeConfirm(this.pickerValue, isPass => {
          isPass && this.handleConfirm()
        })
      } else {
        this.handleConfirm()
      }
    },
    handleConfirm () {
      this.$emit('input', this.pickerValue)
      this.popupShow = false
      this.$emit('confirm')
    },
    setShowValue () {
      if (this.displayFormat) {
        let items = this.$refs.pickerView.getItems()
        this.showValue = this.displayFormat(items)
        return
      }

      let labels = this.$refs.pickerView.getLabels()
      this.showValue = labels.length === 1
        ? labels[0]
        : labels.join(',')
    },
    getPickerView () {
      return this.$refs.pickerView
    }
  }
}
</script>
