<template>
  <div class="jm-picker">
    <jm-popup v-show="popupShow">
      <jm-picker-view />
    </jm-popup>
  </div>
</template>

<script>
import JmPopup from 'jm-design/popup'
import JmPickerView from 'jm-design/pickerView'
import pickerProps from 'jm-design/pickerView/src/pickerProps'

export default {
  name: 'JmPicker',
  components: {
    JmPopup,
    JmPickerView
  },
  data () {
    return {
      popupShow: false
    }
  },
  props: {
    ...pickerProps,
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    valueKey: {
      type: String,
      default: 'text'
    }
  }
}
</script>
