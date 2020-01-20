<script>
import Vue from 'vue'
export default {
  name: 'WdTooltip',
  props: {
    hideMinMax: Boolean,
    hideLabel: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    value: {
      type: [Number, Array],
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    inactiveColor: {
      type: String,
      default: '#e5e5e5'
    },
    activeColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  beforeCreate () {
    this.popperVM = new Vue({
      data: { node: '' },
      render (h) {
        return this.node
      }
    }).$mount()
  },
  render (h) {
    this.popperVM.node = (
      <div>
        <div
          class={
            ['el-tooltip__popper', 'is-']
          }>
          we2e2e2wef42424
        </div>
      </div>)
    return h('div', 'test')
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
