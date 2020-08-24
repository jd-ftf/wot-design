import pickerViewProps from 'wot-design/packages/picker-view/src/pickerViewProps'
import pickerProps from 'wot-design/packages/picker/src/pickerProps'
import locale from 'wot-design/src/mixins/locale'

export default {
  mixins: [locale],

  data () {
    return {
      currentTarget: this,
      showValue: '',
      lastColumns: [],
      popupShow: false
    }
  },

  props: {
    ...pickerViewProps,
    ...pickerProps
  },

  components: {
    CustomCell: {
      render (h) {
        const parent = this.$parent
        const {
          disabled,
          readonly,
          labelWidth,
          label,
          value,
          placeholder,
          showValue,
          showPopup,
          required,
          t
        } = parent
        const fieldClass = ['wd-picker__field']
        // 右箭头
        const arrow = !disabled && !readonly ? (<i class='wd-picker__arrow wd-icon-arrow-right'></i>) : ''

        const noValue = !value || (value instanceof Array && !value.length)
        // 右侧展示值
        const valueDiv = <div class="wd-picker__value" class={['wd-picker__value ', noValue ? 'wd-picker__placeholder' : '']}>
          {(noValue ? placeholder : showValue) || t('wd.picker.placeholder')}
        </div>
        // 左侧label
        const labelWrapper = label || parent.$slots.label ? (<div
          class={['wd-picker__label', required ? 'is-required' : '']}
          style={labelWidth ? `min-width: ${labelWidth}; max-width: ${labelWidth}` : ''
          }>
          {parent.$slots.label || (<div>{label}</div>)}
        </div>) : ''
        // 自定义cell
        const cell = parent.$slots.default || <div class={fieldClass}>
          {labelWrapper}
          {valueDiv}
          {arrow}
        </div>

        return <div onClick={showPopup}>{cell}</div>
      }
    },
    toolbar: {
      props: {
        target: Object
      },
      render (h) {
        const { onCancel, onConfirm, cancelButtonText, confirmButtonText, title, loading, t } = this.target
        const cancelButton = (
          <button
            class="wd-picker__action wd-picker__action--cancel"
            onClick={onCancel}
          >
            {cancelButtonText || t('wd.picker.cancel')}
          </button>
        )

        const confirmButton = (
          <button
            onClick={loading ? () => { } : onConfirm}
            class={['wd-picker__action', loading ? 'is-loading' : '']}
          >
            {confirmButtonText || t('wd.picker.done')}
          </button>
        )

        const titleBlock = title ? <span class="wd-picker__title">{title}</span> : ''
        return (
          <div class="wd-picker__toolbar">{cancelButton}{titleBlock}{confirmButton}</div>
        )
      }
    }
  },

  computed: {
    customClass () {
      const rootClass = ['wd-picker']
      this.error && rootClass.push('is-error')
      this.alignRight && rootClass.push('is-align-right')
      this.disabled && rootClass.push('is-disabled')
      this.size && rootClass.push(`is-${this.size}`)
      this.label | this.$slots.default && rootClass.push('is-cell')

      return rootClass.join(' ')
    }
  },

  methods: {
    showPopup () {
      if (this.disabled || this.readonly) return
      this.showPopInit && this.showPopInit()
      this.popupShow = true
    },

    closePopup () {
      this.popupShow = false
    },

    getPickerView () {
      return this.$refs.pickerView
    }
  }
}
