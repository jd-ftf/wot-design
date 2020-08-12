<script>
export default {
  name: 'WdCell',
  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {},
    clickable: Boolean,
    size: {
      type: String,
      default: 'small'
    },
    titleWidth: String,
    center: Boolean,
    replace: Boolean,
    required: Boolean,
    vertical: Boolean
  },
  computed: {
    iconShow () {
      return this.icon || this.$slots.icon
    }
  },
  methods: {
    handleClick () {
      if (!this.clickable && !this.isLink) return

      this.$emit('click')
    }
  },
  render (h) {
    const { to, title, label, isLink, value, clickable, size, titleWidth, iconShow, replace, center, required, vertical } = this

    const Icon = iconShow ? (
      this.$slots.icon ? this.$slots.icon : <div class="wd-cell__icon"><i class={this.icon}></i></div>
    ) : ''
    const Wrapper = (
      <div class="wd-cell__wrapper" class={['wd-cell__wrapper', (this.$slots.label || label) && 'is-label', vertical && 'is-vertical']}>
        <div class={['wd-cell__left', iconShow && 'is-prefix', required && 'is-required']} style={titleWidth ? `min-width: ${titleWidth}; max-width: ${titleWidth}` : ''}>
          {Icon}
          <div class="wd-cell__title">
            <div class="wd-cell__title-inner">{ this.$slots.title ? this.$slots.title : title }</div>
            {
              this.$slots.label
                ? <div class="wd-cell__label">{this.$slots.label}</div>
                : label
                  ? <div class="wd-cell__label">{label}</div>
                  : ''
            }
          </div>
        </div>
        <div class="wd-cell__right">
          <div class="wd-cell__value">{this.$slots.default ? this.$slots.default : value}</div>
          {
            isLink ? <i class="wd-cell__arrow-right wd-icon-arrow-right"></i> : ''
          }
        </div>
      </div>
    )
    let rootClass = ['wd-cell']
    size && rootClass.push(`is-${size}`)
    center && rootClass.push('is-align-center')
    if (isLink || clickable) {
      rootClass.push('is-link')
    }
    rootClass = rootClass.join(' ')

    if (to) {
      let isRouterLink = false
      if (to && this.$router) {
        const resolved = this.$router.match(to)
        if (resolved.matched.length) {
          isRouterLink = true
        }
      }

      return isRouterLink
        ? <router-link to={to} class={rootClass} replace={replace}>{Wrapper}</router-link>
        : <a class={rootClass} href={to}>{Wrapper}</a>
    } else {
      return <a class={rootClass} onClick={this.handleClick}>{Wrapper}</a>
    }
  }
}
</script>
