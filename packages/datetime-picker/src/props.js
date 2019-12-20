import pickerProps from '../../picker/src/pickerProps'

export default {
  ...pickerProps,
  type: {
    type: String,
    default: 'datetime'
  },
  value: null,
  filter: Function,
  formatter: {
    type: Function,
    default: (type, value) => value
  }
}
