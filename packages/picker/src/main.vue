<template>
  <div class="jm-picker">
    <div class="jm-picker__field" @click="showPopup">
      <div class="jm-picker__label">{{ label }}</div>
      <div class="jm-picker__value">{{ showValue || placeholder || t('jmd.picker.placeholder') }}</div>
      <i class="jm-picker__arrow jm-icon-arrow-right"></i>
    </div>
    <jm-popup v-model="popupShow" position="bottom" @click-modal="onCancel">
      <div class="jm-picker__toolbar">
        <button class="jm-picker__action jm-picker__action--cancel" @click="onCancel">{{ cancelButtonText || t('jmd.picker.cancel') }}</button>
        <span v-if="title" class="jm-picker__title">{{ title }}</span>
        <button class="jm-picker__action" @click="onConfirm">{{ confirmButtonText || t('jmd.picker.done') }}</button>
      </div>
      <jm-picker-view
        ref="pickerView"
        v-model="pickerValue"
        :columns="columns"
        :loading="loading"
        :arrow-html="arrowHtml"
        :visible-item-count="visibleItemCount"
        :item-height="itemHeight"
        :value-key="valueKey"
        :label-key="labelKey"
      />
    </jm-popup>
  </div>
</template>

<script>
import locale from '@/mixins/locale'
import JmPopup from 'jm-design/popup'
import JmPickerView from 'jm-design/pickerView'
import pickerProps from 'jm-design/pickerView/src/pickerProps'

export default {
  name: 'JmPicker',
  mixins: [locale],
  components: {
    JmPopup,
    JmPickerView
  },
  data () {
    return {
      showValue: '',
      popupShow: false,
      pickerValue: this.value
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
    valueKey: {
      type: String,
      default: 'label'
    },
    labelKey: {
      type: String,
      default: 'value'
    },
    showToolbar: Boolean,
    title: String,
    cancelButtonText: Boolean,
    confirmButtonText: Boolean,
    label: String,
    placeholder: String,
    disabled: Boolean,
    readonly: Boolean,
    valueSeparator: {
      type: String,
      default: ','
    }
  },
  watch: {
    value () {
      this.pickerValue = this.value
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
      let labels = this.$refs.pickerView.getLabels()
      this.showValue = labels.length === 1 ? labels[0] : labels.join(this.valueSeparator)
      this.$emit('input', this.pickerValue)
      this.popupShow = false
      this.$emit('confirm')
    }
  }
}
</script>
