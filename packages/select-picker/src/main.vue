<template>
  <div class="wd-col-picker wd-select-picker">
    <div class="wd-col-picker__field" @click="open">
      <slot>
        <div
          class="wd-col-picker__cell"
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
            class="wd-col-picker__label"
            :class="{
              'is-required': required
            }"
            :style="labelWidth ? `min-width: ${labelWidth}; max-width: ${labelWidth}` : ''"
          >
            <slot name="label">{{ label }}</slot>
          </div>
          <div
            class="wd-col-picker__value"
            :class="{
              'wd-col-picker__value--placeholder': (!value || (value instanceof Array && !value.length))
            }"
          >{{ ((!value || (value instanceof Array && !value.length)) ? placeholder : showValue) || t('wd.colPicker.placeholder') }}</div>
          <i v-if="!disabled && !readonly" class="wd-col-picker__arrow wd-icon-arrow-right"></i>
        </div>
      </slot>
    </div>
    <!-- 弹出框 -->
    <wd-action-sheet
      v-model="pickerShow"
      :duration="250"
      :title="title || t('wd.colPicker.title')"
      @close="handlePickerClose"
    >
      <div class="wd-select-picker__wrapper">
        <!-- 多选 -->
        <wd-checkbox-group
          v-if="type === 'checkbox'"
          v-model="selectList"
          cell
          :size="selectSize"
          :checked-color="checkedColor"
          :min="min"
          :max="max"
          @change="handleChange"
        >
          <wd-checkbox
            v-for="(item, index) in columns"
            :key="index"
            :value="item[valueKey]"
            :disabled="item.disabled"
          >{{item[labelKey]}}</wd-checkbox>
        </wd-checkbox-group>
        <!-- 单选 -->
        <wd-radio-group
          v-if="type === 'radio'"
          v-model="selectList"
          cell
          :size="selectSize"
          :checked-color="checkedColor"
          @change="handleChange"
        >
          <wd-radio
            v-for="(item, index) in columns"
            :key="index"
            :value="item[valueKey]"
            :disabled="item.disabled"
          >{{item[labelKey]}}</wd-radio>
        </wd-radio-group>
        <div v-if="loading" class="wd-picker-view__loading" @touchmove.stop.prevent>
          <wd-loading type="circular-ring" :color="loadingColor" />
        </div>
      </div>
      <!-- 确认按钮 -->
      <wd-button
        suck
        @click="onConfirm"
        :disabled="loading"
      >{{confirmButtonText || t('wd.picker.confirm')}}</wd-button>
    </wd-action-sheet>
  </div>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'
import WdActionSheet from 'wot-design/packages/action-sheet'
import WdCheckbox from 'wot-design/packages/checkbox'
import WdCheckboxGroup from 'wot-design/packages/checkbox-group'
import WdRadio from 'wot-design/packages/radio'
import WdRadioGroup from 'wot-design/packages/radio-group'
import cellProps from 'wot-design/packages/select-picker/src/cellProps'
import selectProps from 'wot-design/packages/select-picker/src/selectProps'
import WdLoading from 'wot-design/packages/loading'

export default {
  name: 'WdSelectPicker',
  mixins: [locale],
  components: {
    WdActionSheet,
    WdCheckbox,
    WdCheckboxGroup,
    WdRadio,
    WdRadioGroup,
    WdLoading
  },

  data () {
    return {
      pickerShow: false,
      selectList: this.valueFormat(this.value),
      showValue: '',
      isConfirm: false,
      lastSelectList: []
    }
  },

  props: {
    ...cellProps,
    ...selectProps,
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    value: [Array, String, Number, Boolean],
    // type: checkbox/radio
    type: {
      type: String,
      default: 'checkbox'
    },
    displayFormat: Function,
    beforeConfirm: Function,
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    }
  },

  watch: {
    value: {
      handler (val) {
        this.selectList = this.valueFormat(val)
        this.lastSelectList = this.selectList
        this.setShowValue(this.selectList)
      },
      immediate: true
    }
  },

  methods: {
    getSelectedItem (value) {
      const selecteds = this.columns.filter(item => {
        return item[this.valueKey] === value
      })

      if (selecteds.length > 0) {
        return selecteds[0]
      }

      return {
        [this.valueKey]: value,
        [this.labelKey]: ''
      }
    },

    valueFormat (value) {
      return this.type === 'checkbox' ? Array.prototype.slice.call(value) : value
    },

    handleChange (val) {
      this.$emit('change', val)
    },

    handlePickerClose () {
      // 未确定选项时，数据还原复位
      if (!this.isConfirm) {
        this.selectList = this.valueFormat(this.lastSelectList)
      }
      this.$emit('cancel')
    },

    // 对外暴露接口，打开弹框
    open () {
      if (this.disabled || this.readonly) return
      this.selectList = this.valueFormat(this.value)
      this.pickerShow = true
      this.isConfirm = false
    },

    // 对外暴露接口，关闭弹框
    close () {
      this.pickerShow = false
      this.handlePickerClose()
    },

    onConfirm () {
      if (this.loading) {
        this.pickerShow = false
        this.$emit('confirm', this.valueFormat(this.selectList))
        return
      }
      if (this.beforeConfirm) {
        this.beforeConfirm(this.selectList, isPass => {
          isPass && this.handleConfirm()
        })
      } else {
        this.handleConfirm()
      }
    },

    handleConfirm () {
      this.isConfirm = true
      this.pickerShow = false
      this.lastSelectList = this.valueFormat(this.selectList)
      this.$emit('input', this.lastSelectList)
      this.$emit('confirm', this.lastSelectList)
      this.setShowValue(this.lastSelectList)
    },

    setShowValue (value) {
      if (this.displayFormat) {
        this.showValue = this.displayFormat(value)
      } else {
        let showValue = ''
        if (this.type === 'checkbox') {
          const selectedItems = value.map(item => {
            return this.getSelectedItem(item)
          })
          showValue = selectedItems.map(item => {
            return item[this.labelKey]
          }).join(', ')
        } else if (this.type === 'radio') {
          const selectedItem = this.getSelectedItem(value)
          showValue = selectedItem[this.labelKey]
        } else {
          showValue = value
        }
        this.showValue = showValue
      }
    }
  }
}
</script>
