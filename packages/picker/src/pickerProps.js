import pickerViewProps from '../../picker-view/src/pickerViewProps'

export default {
  ...pickerViewProps,
  title: String,
  cancelButtonText: String,
  confirmButtonText: String,
  label: String,
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  displayFormat: Function
}
