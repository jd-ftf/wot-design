import pickerProps from 'jm-design/picker/src/pickerProps'

export default {
  ...pickerProps,
  value: null,
  filter: Function,
  formatter: {
    type: Function,
    default: (type, value) => value
  }
}
