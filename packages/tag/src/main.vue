<script>
export default {
  name: 'JmTag',
  props: {
    type: String,
    icon: String,
    closable: Boolean,
    plain: Boolean,
    color: String,
    bgColor: String,
    size: String,
    disableTransition: Boolean
  },
  computed: {
    tagClass () {
      let tagClass = ['jm-tag']

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
    }
  },
  render (h) {
    let Icon = this.$slots.icon
      ? this.$slots.icon
      : this.icon
        ? <i class={[ 'jm-tag__icon', this.icon ]}></i>
        : ''

    let Tag = (
      <div
        class={ this.tagClass }
        style={{ background: !this.plain && this.bgColor, borderColor: this.bgColor }}
        onClick={ this.handleClick }
      >
        {Icon}
        <span class="jm-tag__text" style={{ color: this.color }}>
          { this.$slots.default }
        </span>
        {
          this.closable
            ? <i class="jm-tag__close jm-icon-close-outline" onClick={ this.handleClose }></i>
            : ''
        }
      </div>
    )

    return this.disableTransition ? Tag : (<transition name="jm-fadeIn">{ Tag }</transition>)
  }
}
</script>
