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
      default: 'large'
    },
    titleWidth: String,
    center: Boolean,
    align: {
      type: String,
      default: 'left'
    },
    replace: Boolean
  },
  computed: {
    iconShow () {
      return this.icon || this.$slots.icon
    },
    valueShow () {
      return this.value || this.$slots.default
    }
  },
  methods: {
    handleClick () {
      if (!this.clickable) return

      this.$emit('click')
    }
  },
  render (h) {
    const { to, title, label, isLink, value, clickable, size, titleWidth, iconShow, valueShow, replace, align, center } = this

    const Icon = iconShow ? (
      <div class="wd-cell__icon">
        {
          this.$slots.icon ? this.$slots.icon : <i class={this.icon}></i>
        }
      </div>
    ) : ''
    const Wrapper = (
      <div class="wd-cell__wrapper" class={['wd-cell__wrapper', (this.$slots.label || label) && 'is-label']}>
        <div class={['wd-cell__left', iconShow && 'is-prefix']} style={titleWidth ? `min-width: ${titleWidth}; max-width: ${titleWidth}` : ''}>
          {Icon}
          {
            this.$slots.title ? <div class="wd-cell__title">{this.$slots.title}</div> : <div class="wd-cell__title">{title}</div>
          }
          {
            this.$slots.label
              ? <div class="wd-cell__label">{this.$slots.label}</div>
              : label
                ? <div class="wd-cell__label">{label}</div>
                : ''
          }
        </div>
        <div class="wd-cell__right">
          {
            valueShow ? <div class="wd-cell__value">{this.$slots.default ? this.$slots.default : value}</div> : ''
          }
          {
            isLink ? <i class="wd-cell__arrow-right wd-icon-arrow-right"></i> : ''
          }
        </div>
      </div>
    )
    let rootClass = ['wd-cell']
    size && rootClass.push(`is-${size}`)
    align && rootClass.push(`is-${align}`)
    center && rootClass.push('is-align-center')

    if (to) {
      let isRouterLink = false
      if (to && this.$router) {
        const resolved = this.$router.match(to)
        if (resolved.matched.length) {
          isRouterLink = true
        }
      }
      isLink && rootClass.push('is-link')
      rootClass = rootClass.join(' ')

      return isRouterLink
        ? <router-link to={to} class={rootClass} replace={replace}>{Wrapper}</router-link>
        : <a class={rootClass} href={to}>{Wrapper}</a>
    } else {
      clickable && rootClass.push('is-link')
      rootClass = rootClass.join(' ')

      return <a class={rootClass} onClick={this.handleClick}>{Wrapper}</a>
    }
  }
}
</script>
