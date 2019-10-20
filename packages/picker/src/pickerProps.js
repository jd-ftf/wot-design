import pickerViewProps from '../../pickerView/src/pickerViewProps'

export default {
  ...pickerViewProps,
  title: String,
  cancelButtonText: String,
  confirmButtonText: String,
  label: String,
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  labelSeparator: {
    type: String,
    default: ','
  }
}
