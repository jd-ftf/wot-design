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
    size: String,
    titleWidth: String,
    center: Boolean,
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
    const { to, title, label, isLink, value, clickable, size, titleWidth, center, iconShow, valueShow, replace } = this

    const Icon = iconShow ? (
      <div class="wd-cell__icon">
        {
          this.$slots.icon ? this.$slots.icon : <i class={ this.icon }></i>
        }
      </div>
    ) : ''
    const Wrapper = (
      <div class="wd-cell__wrapper">
        <div class="wd-cell__left" style={ titleWidth ? `min-width: ${titleWidth}; max-width: ${titleWidth}` : '' }>
          {
            this.$slots.title ? <div class="wd-cell__title">{ this.$slots.title }</div> : <div class="wd-cell__title">{ title }</div>
          }
          {
            this.$slots.label
              ? <div class="wd-cell__label">{ this.$slots.label }</div>
              : label
                ? <div class="wd-cell__label">{ label }</div>
                : ''
          }
        </div>
        <div class="wd-cell__right">
          {
            valueShow ? <div class="wd-cell__value">{ this.$slots.default ? this.$slots.default : value }</div> : ''
          }
          {
            isLink ? <i class="wd-cell__arrow-right wd-icon-arrow-right"></i> : ''
          }
        </div>
      </div>
    )

    if (to) {
      let isRouterLink = false
      if (to && this.$router) {
        const resolved = this.$router.match(to)
        if (resolved.matched.length) {
          isRouterLink = true
        }
      }

      let rootClass = ['wd-cell is-cell']
      isLink && rootClass.push('is-link')
      size && rootClass.push(`is-${size}`)
      center && rootClass.push('is-center')

      rootClass = rootClass.join(' ')

      return isRouterLink
        ? <router-link to={ to } class={rootClass} replace={replace}>{Icon}{Wrapper}</router-link>
        : <a class={rootClass} href={ to }>{Icon}{Wrapper}</a>
    } else {
      let rootClass = ['wd-cell is-cell']
      clickable && rootClass.push('is-link')
      size && rootClass.push(`is-${size}`)
      center && rootClass.push('is-center')

      rootClass = rootClass.join(' ')

      return <a class={rootClass} onClick={ this.handleClick }>{Icon}{Wrapper}</a>
    }
  }
}
</script>
