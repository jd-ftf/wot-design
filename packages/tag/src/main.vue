<script>
export default {
  name: 'WdTag',
  props: {
    type: String,
    icon: String,
    closable: Boolean,
    plain: Boolean,
    round: Boolean,
    mark: Boolean,
    dynamic: Boolean,
    color: String,
    bgColor: String,
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
      this.round && tagClass.push('is-round')
      this.mark && tagClass.push('is-mark')

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
    },
    handleAdd () {
      this.dynamicInput = true
      this.dynamicValue = ''
      this.$nextTick(() => {
        this.$refs.addText.focus()
      })
    }
  },
  render (h) {
    let Icon = this.$slots.icon
      ? this.$slots.icon
      : this.icon
        ? <i class={[ 'wd-tag__icon', this.icon ]}></i>
        : ''
    let Content = !this.dynamic
      ? <div class="wd-tag__text-container">
        <span class={[ 'wd-tag__text', this.round || this.icon ? '' : 'wd-tag__text-hidden' ]}>{ this.$slots.default }</span>
        <span v-show={ !this.round && !this.icon } class="wd-tag__text wd-tag__text-real" style={{ color: this.color }}>{ this.$slots.default }</span>
      </div>
      : this.dynamicInput
        ? <input ref="addText" class="wd-tag__add-text" type="text" autofocus vModel={ this.dynamicValue } onBlur={ this.handleBlur } onKeypress={ this.handleConfirm } placeholder="请输入"/>
        : <span class="wd-tag__text"
          style={{ color: this.color }}
          onClick={ this.handleAdd }
        ><i class="wd-tag__add wd-icon-add"></i>新增标签</span>

    let Tag = (
      <div
        class={[ this.tagClass,
          {
            'is-icon': Icon,
            'is-dynamic': this.dynamic,
            'is-dynamic-input': this.dynamicInput
          }
        ]}
        style={{ background: !this.plain && this.bgColor, borderColor: this.bgColor }}
        onClick={ this.handleClick }
      >
        {Icon}
        {Content}
        {
          this.closable && this.round
            ? <i class="wd-tag__close wd-icon-error-fill" onClick={ this.handleClose }></i>
            : ''
        }
      </div>
    )

    return this.disableTransition ? Tag : (<transition name="wd-fade">{ Tag }</transition>)
  }
}
</script>
