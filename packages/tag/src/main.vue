<script>
export default {
  name: 'WdTag',
  props: {
    type: String,
    icon: String,
    closable: Boolean,
    plain: Boolean,
    dynamic: Boolean,
    color: String,
    bgColor: String,
    size: String,
    disableTransition: Boolean
  },
  data () {
    return {
      dynamicValue: '',
      dynamicInput: false
    }
  },
  computed: {
    tagClass () {
      let tagClass = ['wd-tag']

      this.type && tagClass.push(`is-${this.type}`)
      this.plain && tagClass.push('is-plain')
      this.size && tagClass.push(`is-${this.size}`)

      return tagClass
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    },
    handleClose (event) {
      event.stopPropagation()
      this.$emit('close')
    },
    handleAdd () {
      this.dynamicInput = true
      this.dynamicValue = ''
      this.$nextTick(() => {
        this.$refs.addText.focus()
      })
    },
    handleBlur () {
      this.setDynamicInput()
    },
    handleConfirm (event) {
      if (event.keyCode === 13) {
        this.setDynamicInput()
        this.$emit('confirm', this.dynamicValue)
      }
    },
    setDynamicInput () {
      this.dynamicInput = false
    }
  },
  render (h) {
    let Icon = this.$slots.icon
      ? this.$slots.icon
      : this.icon
        ? <i class={[ 'wd-tag__icon', this.icon ]}></i>
        : ''
    let Content = !this.dynamic
      ? <span class="wd-tag__text" style={{ color: this.color }}>{ this.$slots.default }</span>
      : this.dynamicInput
        ? <input ref="addText" class="wd-tag__add-text" type="text" autofocus vModel={ this.dynamicValue } onBlur={ this.handleBlur } onKeypress={ this.handleConfirm }/>
        : <span class="wd-tag__text" style={{ color: this.color }} onClick={ this.handleAdd } >+新增标签</span>

    let Tag = (
      <div
        class={ this.tagClass }
        style={{ background: !this.plain && this.bgColor, borderColor: this.bgColor }}
        onClick={ this.handleClick }
      >
        {Icon}
        {Content}
        {
          this.closable
            ? <i class="wd-tag__close wd-icon-close-outline" onClick={ this.handleClose }></i>
            : ''
        }
      </div>
    )

    return this.disableTransition ? Tag : (<transition name="wd-fade">{ Tag }</transition>)
  }
}
</script>
