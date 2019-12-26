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
        this.$emit('input', this.transferToValue())
        this.$emit('confirm')
      })
    },
    onCancel () {
      this.$emit('cancel')
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
