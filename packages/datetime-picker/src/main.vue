<script>
import DatePicker from './datePicker'
import TimePicker from './timePicker'

export default {
  name: 'JmDatetimePicker',
  props: {
    ...TimePicker.props,
    ...DatePicker.props
  },
  render () {
    const Component = this.type === 'time' ? TimePicker : DatePicker

    return (
      <Component
        {...{
          props: this.$props,
          on: this.$listeners
        }}
      />
    )
  }
}
</script>
