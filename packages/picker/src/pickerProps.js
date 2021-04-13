export default {
  title: String,
  cancelButtonText: String,
  confirmButtonText: String,
  label: String,
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
  displayFormat: Function,
  beforeConfirm: Function,
  size: String,
  labelWidth: String,
  error: Boolean,
  alignRight: Boolean,
  columnChange: Function,
  columnChangeEnd: Function,
  valueKey: {
    type: String,
    default: 'value'
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPopstate: {
    type: Boolean,
    default: true
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  }
}
