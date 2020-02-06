<script>
import DatetimePickerView from 'wot-design/src/mixins/datetimePickerView'
import Picker from 'wot-design/packages/picker'
import pickerProps from '../../picker/src/pickerProps'

export default {
  name: 'WdDatetimePicker',
  mixins: [DatetimePickerView],
  props: {
    ...pickerProps
  },
  methods: {
    onConfirm () {
      this.$nextTick(() => {
        this.$emit('input', this.innerValue)
        this.$emit('confirm')
      })
    },
    onCancel () {
      // reset innerValue
      this.innerValue = this.formatValue(this.value)
      this.$emit('cancel')
    },
    defaultDisplayFormat (items) {
      if (items.length === 0) return ''
      // 如果使用了自定义的的formatter，defaultDisplayFormat无效
      if (this.formatter) {
        return this.$refs.picker.getPickerView().getLabels().join('')
      }
      switch (this.type) {
        case 'date':
          return `${items[0].label}-${items[1].label}-${items[2].label}`
        case 'year-month':
          return `${items[0].label}-${items[1].label}`
        case 'time':
          return `${items[0].label}:${items[1].label}`
        case 'datetime':
          return `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}`
      }
    },
    handleBeforeConfirm (value, resolve) {
      this.beforeConfirm(this.innerValue, resolve)
    }
  },
  render () {
    let props = {}
    Object.keys(Picker.props).filter(key => {
      return key !== 'value'
    }).forEach(key => {
      props[key] = this[key]
    })
    props['columnChange'] = this.onColumnChange
    this.beforeConfirm && (props['beforeConfirm'] = this.handleBeforeConfirm)
    !props['displayFormat'] && (props['displayFormat'] = this.defaultDisplayFormat)

    return (
      <Picker
        ref="picker"
        vModel={this.pickerValue}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        {...{ props }}
      />
    )
  }
}
</script>
